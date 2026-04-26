export const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "CivicGuide API",
    "version": "1.0.0",
    "description": "Backend API for the CivicGuide Election Process Assistant"
  },
  "servers": [
    {
      "url": "http://localhost:8080"
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "paths": {
    "/process": {
      "get": {
        "summary": "Get Election Process specific to a region",
        "parameters": [
          {
            "in": "query",
            "name": "region",
            "required": false,
            "schema": {
              "type": "string"
            },
            "description": "Region name (e.g. India, US)"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation"
          }
        }
      }
    },
    "/translate": {
      "get": {
        "summary": "Mock Google Translate integration endpoint",
        "parameters": [
          {
            "in": "query",
            "name": "text",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "targetLanguage",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Translated mock response"
          }
        }
      }
    },
    "/auth/register": {
      "post": {
        "summary": "Mock User Registration",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": { "type": "string" },
                  "password": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Returns mock JWT and UID" }
        }
      }
    },
    "/auth/login": {
      "post": {
        "summary": "Mock User Login",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": { "type": "string" },
                  "password": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Returns mock JWT and UID" }
        }
      }
    },
    "/user/profile": {
      "get": {
        "summary": "Get logged in user profile defaults",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": { "description": "Returns user database mock profile parameters" }
        }
      }
    }
  }
};
