export const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "CivicGuide API",
    "version": "2.0.0",
    "description": "Backend API for the CivicGuide Election Process Assistant. Uses Firebase Authentication for secure endpoints."
  },
  "servers": [
    { "url": "http://localhost:8080", "description": "Local Development" }
  ],
  "components": {
    "securitySchemes": {
      "firebaseAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "Firebase ID Token",
        "description": "Firebase ID token obtained via Firebase Client SDK"
      }
    }
  },
  "paths": {
    "/process": {
      "get": {
        "summary": "Get election process steps for a region",
        "description": "Returns region-specific or general election steps. Supports India, US, and general fallback.",
        "parameters": [
          {
            "in": "query",
            "name": "region",
            "required": false,
            "schema": { "type": "string", "example": "India" },
            "description": "Country name (India, US, or omit for general)"
          }
        ],
        "responses": {
          "200": {
            "description": "Election process steps",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "mode": { "type": "string", "enum": ["general", "region-specific"] },
                    "steps": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": { "type": "string" },
                          "title": { "type": "string" },
                          "description": { "type": "string" },
                          "order": { "type": "integer" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/translate": {
      "get": {
        "summary": "Translate text (mock Google Translate)",
        "parameters": [
          { "in": "query", "name": "text", "required": true, "schema": { "type": "string" } },
          { "in": "query", "name": "targetLanguage", "required": true, "schema": { "type": "string", "example": "es" } }
        ],
        "responses": {
          "200": { "description": "Translated text response" },
          "400": { "description": "Missing required parameters" }
        }
      }
    },
    "/auth/register": {
      "post": {
        "summary": "Create user profile in Firestore",
        "description": "Called after Firebase Client SDK creates the auth user. Creates the Firestore profile document.",
        "security": [{ "firebaseAuth": [] }],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Profile created" },
          "401": { "description": "Unauthorized" }
        }
      }
    },
    "/user/profile": {
      "get": {
        "summary": "Get user profile and saved state",
        "security": [{ "firebaseAuth": [] }],
        "responses": {
          "200": {
            "description": "User profile with region, language, and progress",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "selectedRegion": { "type": "string" },
                    "selectedState": { "type": "string" },
                    "selectedDistrict": { "type": "string" },
                    "preferredLanguage": { "type": "string" },
                    "progress": { "type": "object" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/user/progress": {
      "put": {
        "summary": "Save guide progress",
        "security": [{ "firebaseAuth": [] }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "progress": {
                    "type": "object",
                    "additionalProperties": { "type": "string", "enum": ["pending", "active", "completed"] }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Progress saved" },
          "401": { "description": "Unauthorized" }
        }
      }
    },
    "/user/preferences": {
      "put": {
        "summary": "Save user preferences (region, language)",
        "security": [{ "firebaseAuth": [] }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "selectedRegion": { "type": "string" },
                  "selectedState": { "type": "string" },
                  "selectedDistrict": { "type": "string" },
                  "preferredLanguage": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Preferences saved" },
          "401": { "description": "Unauthorized" }
        }
      }
    }
  }
};
