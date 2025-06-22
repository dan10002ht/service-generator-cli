function getGoTemplates() {
  return {
    'go.mod': `module <%= moduleName %>

go 1.21

require (
	github.com/grpc-ecosystem/go-grpc-middleware/v2 v2.1.0
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.19.1
	github.com/spf13/viper v1.18.2
	github.com/stretchr/testify v1.8.4
	go.uber.org/zap v1.26.0
	google.golang.org/grpc v1.62.1
	google.golang.org/protobuf v1.33.0
)

require (
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/fsnotify/fsnotify v1.7.0 // indirect
	github.com/golang/protobuf v1.5.3 // indirect
	github.com/hashicorp/hcl v1.0.0 // indirect
	github.com/magiconair/properties v1.8.7 // indirect
	github.com/mitchellh/mapstructure v1.5.0 // indirect
	github.com/pelletier/go-toml/v2 v2.1.0 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	github.com/sagikazarmark/locafero v0.4.0 // indirect
	github.com/sagikazarmark/slog-shim v0.1.0 // indirect
	github.com/sourcegraph/conc v0.3.0 // indirect
	github.com/spf13/afero v1.11.0 // indirect
	github.com/spf13/cast v1.6.0 // indirect
	github.com/spf13/pflag v1.0.5 // indirect
	github.com/subosito/gotenv v1.6.0 // indirect
	go.uber.org/multierr v1.10.0 // indirect
	golang.org/x/exp v0.0.0-20230905200255-921286631fa9 // indirect
	golang.org/x/net v0.20.0 // indirect
	golang.org/x/sys v0.16.0 // indirect
	golang.org/x/text v0.14.0 // indirect
	google.golang.org/genproto/googleapis/api v0.0.0-20240125205218-1f4bbc51befe // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20240125205218-1f4bbc51befe // indirect
	gopkg.in/ini.v1 v1.67.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)`,

    'README.md': `# <%= serviceName %>

Đây là boilerplate mẫu cho một microservice Go với gRPC, HTTP Gateway, Clean Architecture và best practices cho production.

## 🏗️ Kiến trúc

\`\`\`
<%= serviceName %>/
├── cmd/server/           # Entry point
├── internal/             # Private application code
│   ├── config/          # Configuration management
│   ├── handler/         # gRPC handlers
│   ├── logger/          # Structured logging
│   ├── model/           # Domain models
│   ├── repository/      # Data access layer
│   └── service/         # Business logic
├── proto/               # Protocol Buffers definitions
├── config/              # Configuration files
├── Dockerfile           # Multi-stage Docker build
├── Makefile             # Development commands
└── go.mod               # Go modules
\`\`\`

## 🚀 Tính năng

- **gRPC + HTTP Gateway**: Hỗ trợ cả gRPC và REST API
- **Clean Architecture**: Tách biệt rõ ràng các layer
- **Structured Logging**: Sử dụng Zap logger
- **Configuration Management**: Viper với environment variables
- **Testing**: Unit tests với mocking
- **Docker**: Multi-stage build tối ưu
- **Hot Reload**: Air cho development
- **Graceful Shutdown**: Xử lý shutdown an toàn

## 📋 Yêu cầu hệ thống

- Go 1.21+
- Protocol Buffers Compiler
- Make (optional, cho development)

## 🛠️ Cài đặt

### 1. Cài Go
\`\`\`bash
# Ubuntu/Debian
sudo apt update
sudo apt install golang-go

# Hoặc từ binary
curl -OL https://go.dev/dl/go1.22.3.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.3.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
\`\`\`

### 2. Cài Protocol Buffers
\`\`\`bash
sudo apt install protobuf-compiler
\`\`\`

### 3. Setup project
\`\`\`bash
# Clone và setup
git clone <your-repo>
cd <%= serviceName %>

# Install dependencies
make deps

# Setup development environment
make dev-setup
\`\`\`

## 🏃‍♂️ Chạy ứng dụng

### Development mode (với hot reload)
\`\`\`bash
make dev
\`\`\`

### Production mode
\`\`\`bash
make run
\`\`\`

### Build binary
\`\`\`bash
make build
\`\`\`

## 🧪 Testing

\`\`\`bash
# Chạy tất cả tests
make test

# Chạy tests với coverage
make test-coverage

# Chạy benchmarks
make bench

# Chạy tests với race detection
make race
\`\`\`

## 🔧 Development

### Generate protobuf code
\`\`\`bash
make proto
\`\`\`

### Code quality
\`\`\`bash
# Format code
make fmt

# Run linter
make lint

# Run go vet
make vet
\`\`\`

### Docker
\`\`\`bash
# Build image
make docker-build

# Run container
make docker-run
\`\`\`

## 📡 API Endpoints

### gRPC (Port 9090)
- \`GetUser(id)\` - Lấy thông tin user
- \`CreateUser(name, email)\` - Tạo user mới
- \`ListUsers(page, size)\` - Lấy danh sách users

### HTTP Gateway (Port 8080)
- \`GET /v1/users/{id}\` - Lấy user theo ID
- \`POST /v1/users\` - Tạo user mới
- \`GET /v1/users?page=1&size=10\` - Lấy danh sách users

## 🏗️ Architecture Patterns

### Clean Architecture
- **Handler Layer**: Xử lý gRPC requests/responses
- **Service Layer**: Business logic và validation
- **Repository Layer**: Data access abstraction
- **Model Layer**: Domain entities

### Repository Pattern
- Interface-based design
- Easy to mock cho testing
- Dễ thay đổi implementation (in-memory → database)

### Dependency Injection
- Constructor-based DI
- Testable và maintainable
- Loose coupling

## 🔒 Security Features

- Non-root user trong Docker
- Graceful shutdown
- Structured error handling
- Input validation
- Rate limiting ready

## 📊 Monitoring & Observability

- Structured logging với Zap
- Request/response logging
- Performance metrics ready
- Health checks
- Graceful shutdown

## 🚀 Deployment

### Docker
\`\`\`bash
# Build production image
make docker-build

# Run với Docker Compose
docker-compose up -d
\`\`\`

### Kubernetes
\`\`\`bash
# Apply manifests
kubectl apply -f k8s/
\`\`\`

### Binary
\`\`\`bash
# Build
make build

# Run
./bin/user-service
\`\`\`

## 🔧 Configuration

### Environment Variables
\`\`\`bash
APP_SERVER_GRPC_PORT=9090
APP_SERVER_HTTP_PORT=8080
APP_LOG_LEVEL=info
APP_DATABASE_HOST=localhost
\`\`\`

### Config File (config/config.yaml)
\`\`\`yaml
server:
  grpc_port: 9090
  http_port: 8080
  timeout: 30s

log:
  level: info
  file: ""

database:
  host: localhost
  port: 5432
  user: postgres
  password: password
  dbname: users_db
  sslmode: disable
\`\`\`

## 🧪 Testing Strategy

### Unit Tests
- Service layer với mocked repository
- Model validation
- Business logic testing

### Integration Tests
- gRPC handler testing
- End-to-end API testing

### Performance Tests
- Benchmarks
- Load testing ready

## 📈 Performance

- gRPC cho high-performance communication
- Connection pooling ready
- Efficient memory usage
- Optimized Docker image size

## 🔄 CI/CD Ready

\`\`\`bash
# Run CI pipeline
make ci

# Production build
make prod-build
\`\`\`

## 🐛 Troubleshooting

### Lỗi thường gặp
1. **Port đã được sử dụng**: Thay đổi port trong config
2. **Protobuf không generate**: Chạy \`make proto\`
3. **Dependencies lỗi**: Chạy \`make deps\`

### Logs
\`\`\`bash
# Xem logs
docker logs <container-id>

# Debug mode
APP_LOG_LEVEL=debug make run
\`\`\`

## 📚 Best Practices

- **Error Handling**: Wrapped errors với context
- **Logging**: Structured logging với correlation IDs
- **Testing**: Table-driven tests với mocking
- **Configuration**: Environment-based config
- **Security**: Non-root containers, input validation
- **Performance**: Connection pooling, efficient algorithms

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Add tests
4. Run \`make ci\`
5. Submit pull request

## 📄 License

MIT License`,

    'proto/user.proto': `syntax = "proto3";

package user;

option go_package = "<%= moduleName %>/proto/user";

import "google/api/annotations.proto";

service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse) {
    option (google.api.http) = {
      get: "/v1/users/{id}"
    };
  }
  
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse) {
    option (google.api.http) = {
      post: "/v1/users"
      body: "*"
    };
  }
  
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse) {
    option (google.api.http) = {
      get: "/v1/users"
    };
  }
}

message GetUserRequest {
  string id = 1;
}

message GetUserResponse {
  string id = 1;
  string name = 2;
  string email = 3;
  string created_at = 4;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
}

message CreateUserResponse {
  string id = 1;
  string name = 2;
  string email = 3;
  string created_at = 4;
}

message ListUsersRequest {
  int32 page = 1;
  int32 size = 2;
}

message ListUsersResponse {
  repeated GetUserResponse users = 1;
  int32 total = 2;
  int32 page = 3;
  int32 size = 4;
}`,

    'cmd/server/main.go': `package main

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"<%= moduleName %>/internal/config"
	"<%= moduleName %>/internal/handler"
	"<%= moduleName %>/internal/logger"
	"<%= moduleName %>/internal/repository"
	"<%= moduleName %>/internal/service"
	pb "<%= moduleName %>/proto/user"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		fmt.Printf("Failed to load config: %v\n", err)
		os.Exit(1)
	}

	// Initialize logger
	if err := logger.Init(cfg.Log.Level, cfg.Log.File); err != nil {
		fmt.Printf("Failed to initialize logger: %v\n", err)
		os.Exit(1)
	}
	defer logger.Sync()

	log := logger.GetLogger()
	log.Info("Starting user service", zap.String("version", "1.0.0"))

	// Initialize dependencies
	userRepo := repository.NewUserRepository()
	userService := service.NewUserService(userRepo)
	userHandler := handler.NewUserHandler(userService, log)

	// Create gRPC server
	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(loggingInterceptor(log)),
	)

	// Register services
	pb.RegisterUserServiceServer(grpcServer, userHandler)
	reflection.Register(grpcServer)

	// Start gRPC server
	grpcListener, err := net.Listen("tcp", fmt.Sprintf(":%d", cfg.Server.GRPCPort))
	if err != nil {
		log.Fatal("Failed to listen for gRPC", zap.Error(err))
	}

	go func() {
		log.Info("Starting gRPC server", zap.Int("port", cfg.Server.GRPCPort))
		if err := grpcServer.Serve(grpcListener); err != nil {
			log.Fatal("Failed to serve gRPC", zap.Error(err))
		}
	}()

	// Create HTTP server with gRPC-Gateway
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithInsecure()}

	if err := pb.RegisterUserServiceHandlerFromEndpoint(
		ctx, mux, fmt.Sprintf("localhost:%d", cfg.Server.GRPCPort), opts,
	); err != nil {
		log.Fatal("Failed to register gRPC-Gateway", zap.Error(err))
	}

	httpServer := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.Server.HTTPPort),
		Handler: mux,
	}

	go func() {
		log.Info("Starting HTTP server", zap.Int("port", cfg.Server.HTTPPort))
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Failed to serve HTTP", zap.Error(err))
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Info("Shutting down server...")

	// Graceful shutdown
	ctx, cancel = context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Shutdown HTTP server
	if err := httpServer.Shutdown(ctx); err != nil {
		log.Error("HTTP server shutdown failed", zap.Error(err))
	}

	// Shutdown gRPC server
	grpcServer.GracefulStop()

	log.Info("Server stopped")
}

func loggingInterceptor(logger *zap.Logger) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		start := time.Now()
		resp, err := handler(ctx, req)
		duration := time.Since(start)

		logger.Info("gRPC request",
			zap.String("method", info.FullMethod),
			zap.Duration("duration", duration),
			zap.Error(err),
		)

		return resp, err
	}
}`,

    'Makefile': `.PHONY: help build run test clean proto lint docker-build docker-run

# Variables
BINARY_NAME=user-service
DOCKER_IMAGE=<%= serviceName %>:latest
PROTO_DIR=proto
GO_DIR=.

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build the application
	@echo "Building..."
	go build -o bin/$(BINARY_NAME) ./cmd/server

run: ## Run the application
	@echo "Running..."
	go run ./cmd/server

test: ## Run tests
	@echo "Running tests..."
	go test -v ./...

test-coverage: ## Run tests with coverage
	@echo "Running tests with coverage..."
	go test -v -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html

proto: ## Generate protobuf code
	@echo "Generating protobuf code..."
	protoc --go_out=. --go_opt=paths=source_relative \
		--go-grpc_out=. --go-grpc_opt=paths=source_relative \
		--grpc-gateway_out=. --grpc-gateway_opt=paths=source_relative \
		$(PROTO_DIR)/*.proto

lint: ## Run linter
	@echo "Running linter..."
	golangci-lint run

clean: ## Clean build artifacts
	@echo "Cleaning..."
	rm -rf bin/
	rm -f coverage.out coverage.html

deps: ## Install dependencies
	@echo "Installing dependencies..."
	go mod download
	go mod tidy

deps-dev: ## Install development dependencies
	@echo "Installing development dependencies..."
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway@latest

docker-build: ## Build Docker image
	@echo "Building Docker image..."
	docker build -t $(DOCKER_IMAGE) .

docker-run: ## Run Docker container
	@echo "Running Docker container..."
	docker run -p 8080:8080 -p 9090:9090 $(DOCKER_IMAGE)

dev: ## Run in development mode with hot reload
	@echo "Running in development mode..."
	air

install-air: ## Install Air for hot reload
	@echo "Installing Air..."
	go install github.com/cosmtrek/air@latest

fmt: ## Format code
	@echo "Formatting code..."
	go fmt ./...

vet: ## Run go vet
	@echo "Running go vet..."
	go vet ./...

bench: ## Run benchmarks
	@echo "Running benchmarks..."
	go test -bench=. ./...

race: ## Run tests with race detection
	@echo "Running tests with race detection..."
	go test -race ./...

# Development workflow
dev-setup: deps deps-dev install-air ## Setup development environment
	@echo "Development environment setup complete!"

# CI/CD
ci: deps proto lint test ## Run CI pipeline
	@echo "CI pipeline completed successfully!"

# Production
prod-build: clean proto build ## Build for production
	@echo "Production build completed!"`,

    'Dockerfile': `# Build stage
FROM golang:1.21-alpine AS builder

# Install git and protobuf compiler
RUN apk add --no-cache git protobuf

# Set working directory
WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Generate protobuf code
RUN protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    --grpc-gateway_out=. --grpc-gateway_opt=paths=source_relative \
    proto/*.proto

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server

# Final stage
FROM alpine:latest

# Install ca-certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

# Create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Set working directory
WORKDIR /root/

# Copy binary from builder stage
COPY --from=builder /app/main .

# Copy config files
COPY --from=builder /app/config ./config

# Change ownership to non-root user
RUN chown -R appuser:appgroup /root/

# Switch to non-root user
USER appuser

# Expose ports
EXPOSE 8080 9090

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Run the application
CMD ["./main"]`,

    '.air.toml': `root = "."
testdata_dir = "testdata"
tmp_dir = "tmp"

[build]
  args_bin = []
  bin = "./tmp/main"
  cmd = "go build -o ./tmp/main ./cmd/server"
  delay = 1000
  exclude_dir = ["assets", "tmp", "vendor", "testdata"]
  exclude_file = []
  exclude_regex = ["_test.go"]
  exclude_unchanged = false
  follow_symlink = false
  full_bin = ""
  include_dir = []
  include_ext = ["go", "tpl", "tmpl", "html"]
  include_file = []
  kill_delay = "0s"
  log = "build-errors.log"
  poll = false
  poll_interval = 0
  rerun = false
  rerun_delay = 500
  send_interrupt = false
  stop_on_root = false

[color]
  app = ""
  build = "yellow"
  main = "magenta"
  runner = "green"
  watcher = "cyan"

[log]
  main_only = false
  time = false

[misc]
  clean_on_exit = false

[screen]
  clear_on_rebuild = false
  keep_scroll = true`,

    'config/config.yaml': `server:
  grpc_port: 9090
  http_port: 8080
  timeout: 30s

database:
  host: localhost
  port: 5432
  user: postgres
  password: password
  dbname: users_db
  sslmode: disable

log:
  level: debug
  file: ""`
  };
}

module.exports = { getGoTemplates }; 