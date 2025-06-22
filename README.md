# Service Generator CLI

CLI tool để generate microservice boilerplates cho Java, Go, và JavaScript với gRPC support.

## 🚀 Tính năng

- **Multi-language support**: Java (Spring Boot), Go, JavaScript (Node.js)
- **gRPC ready**: Tích hợp sẵn gRPC cho high-performance communication
- **Clean Architecture**: Repository pattern, service layer, dependency injection
- **Production ready**: Docker, testing, logging, monitoring
- **Interactive mode**: Hướng dẫn từng bước
- **Customizable**: Dễ dàng mở rộng templates

## 📦 Cài đặt

### Cài đặt globally

```bash
npm install -g service-generator-cli
```

### Cài đặt locally

```bash
npm install service-generator-cli
npx service-generator new --language=java --name=my-service
```

### Từ source

```bash
git clone https://github.com/your-username/service-generator-cli.git
cd service-generator-cli
npm install
npm link
```

## 🎯 Sử dụng

### Interactive mode (Khuyến nghị)

```bash
service-generator new --interactive
```

### Command line

```bash
# Generate Java service
service-generator new --language=java --name=user-service

# Generate Go service
service-generator new --language=go --name=payment-service

# Generate JavaScript service
service-generator new --language=js --name=notification-service

# Specify output directory
service-generator new --language=java --name=my-service --output=/path/to/projects
```

### Xem danh sách templates

```bash
service-generator list
```

## 📋 Options

| Option          | Short | Description                         | Default  |
| --------------- | ----- | ----------------------------------- | -------- |
| `--language`    | `-l`  | Programming language (java, go, js) | java     |
| `--name`        | `-n`  | Service name                        | required |
| `--output`      | `-o`  | Output directory                    | .        |
| `--interactive` | `-i`  | Interactive mode                    | false    |

## 🏗️ Generated Structure

### Java (Spring Boot + gRPC)

```
user-service/
├── src/main/
│   ├── java/com/example/
│   │   ├── controller/      # gRPC Controllers
│   │   ├── service/         # Business Logic
│   │   ├── repository/      # Data Access
│   │   ├── model/           # Domain Models
│   │   └── SampleJavaServiceApplication.java
│   ├── proto/               # gRPC Protocol Buffers
│   └── resources/
│       └── application.yml  # Configuration
├── src/test/                # Unit Tests
├── pom.xml                  # Maven config
└── README.md               # Documentation
```

### Go (gRPC + HTTP Gateway)

```
payment-service/
├── cmd/server/              # Entry point
├── internal/
│   ├── config/             # Configuration
│   ├── handler/            # gRPC handlers
│   ├── service/            # Business logic
│   ├── repository/         # Data access
│   └── model/              # Domain models
├── proto/                  # Protocol Buffers
├── config/                 # Config files
├── Dockerfile              # Multi-stage build
├── Makefile                # Development commands
├── go.mod                  # Go modules
└── README.md              # Documentation
```

### JavaScript (Node.js + Express + gRPC)

```
notification-service/
├── src/
│   ├── proto/              # gRPC Protocol Buffers
│   ├── controllers/        # gRPC Controllers
│   ├── services/           # Business Logic
│   ├── repositories/       # Data Access
│   ├── models/             # Domain Models
│   ├── index.js            # Express server
│   └── server.js           # gRPC server
├── package.json            # Dependencies
├── .eslintrc.json          # ESLint config
├── .prettierrc             # Prettier config
└── README.md              # Documentation
```

## 🔧 Development

### Setup development environment

```bash
git clone https://github.com/your-username/service-generator-cli.git
cd service-generator-cli
npm install
npm link
```

### Test locally

```bash
# Test interactive mode
service-generator new --interactive

# Test specific language
service-generator new --language=java --name=test-service
```

### Add new templates

1. Create template file in `src/templates/`
2. Add template function in `src/templates.js`
3. Update generator logic in `src/generator.js`

## 📚 Templates

### Java Template Features

- Spring Boot 3.2.5
- gRPC with Spring Boot starter
- Clean Architecture pattern
- Maven with plugins (protobuf, checkstyle, spotless)
- Unit testing with JUnit 5 + Mockito
- Docker ready

### Go Template Features

- Go 1.21+
- gRPC + HTTP Gateway
- Clean Architecture
- Structured logging (Zap)
- Configuration management (Viper)
- Testing with testify
- Multi-stage Docker build
- Makefile with development commands

### JavaScript Template Features

- Node.js 14+
- Express.js
- gRPC with @grpc/grpc-js
- ES6 modules
- ESLint + Prettier
- Babel for transpilation
- Hot reload with nodemon

## 🚀 Quick Start

```bash
# 1. Install CLI
npm install -g service-generator-cli

# 2. Generate service
service-generator new --interactive

# 3. Follow prompts
# Choose language: Java
# Enter name: user-service
# Output directory: .

# 4. Navigate to generated service
cd user-service

# 5. Start development
# For Java: mvn spring-boot:run
# For Go: make dev
# For JS: npm start
```

## 🔄 Workflow

1. **Generate**: Tạo boilerplate với CLI
2. **Customize**: Thêm business logic và models
3. **Test**: Chạy unit tests và integration tests
4. **Deploy**: Build và deploy với Docker/Kubernetes

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Test with multiple languages

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/service-generator-cli/issues)
- **Documentation**: [Wiki](https://github.com/your-username/service-generator-cli/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/service-generator-cli/discussions)

## 🔮 Roadmap

- [ ] Add more languages (Python, Rust, C#)
- [ ] Database integration templates
- [ ] Kubernetes manifests
- [ ] CI/CD pipeline templates
- [ ] Custom template support
- [ ] Plugin system
- [ ] Template marketplace

## 📊 Statistics

- **Languages**: 3 (Java, Go, JavaScript)
- **Templates**: 50+ files per language
- **Features**: gRPC, HTTP, Testing, Docker, CI/CD
- **Architecture**: Clean Architecture, Repository Pattern
