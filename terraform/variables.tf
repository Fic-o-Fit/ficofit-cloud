variable project_id {
  type        = string
  default     = "PROJECT_ID"
  description = "Name of project id"
}

variable project_region {
  type        = string
  default     = "PROJECT_REGION"
  description = "Name of project region"
}

variable project_zone {
  type        = string
  default     = "PROJECT_ZONE"
  description = "Name of project zone"
}

variable name {
  type        = string
  default     = "NAME_YOUR_APP"
  description = "Name of the services/app."
}

variable image {
  type        = string
  default     = "GCR_URL:COMMIT"
  description = "gcr image name url"
}

variable container_port {
  type        = number
  default     = 5000
  description = "Container port"
}

variable target_location {
  type        = string
  default     = "TARGET_LOCATION"
  description = "Target where you deploy the services [availability zone]"
}

variable allow_public_access {
  type        = bool
  default     = true
  description = "Allow unauthenticated access to the service."
}