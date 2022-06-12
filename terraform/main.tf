terraform {
  required_version = ">= 0.14"

  required_providers {
    # Cloud Run support was added on 3.3.0
    google = ">= 3.3"
  }
}

provider "google" {
  project     = var.project_id
  credentials = file("credentials.json") // PUT YOUR CREDENTIAL IN terraform/credentials.json
  region      = var.project_region
  zone        = var.project_zone
}

# Enables the Cloud Run API
resource "google_project_service" "default" {
  service = "run.googleapis.com"

  disable_on_destroy = true
}
# Create the Cloud Run service
resource "google_cloud_run_service" "default" {
  name      = var.name
  location  = var.target_location

  template {
    spec {
      containers {
        image = var.image

        ports {
          container_port = var.container_port
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  # Waits for the Cloud Run API to be enabled
  depends_on = [google_project_service.default]
}

# Allow unauthenticated users to invoke the service
resource "google_cloud_run_service_iam_member" "run_all_users" {
  service  = google_cloud_run_service.default.name
  location = google_cloud_run_service.default.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Display the service URL
output "service_url" {
  value = google_cloud_run_service.default.status[0].url
}