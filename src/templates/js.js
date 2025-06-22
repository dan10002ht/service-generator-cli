function getJSTemplates() {
  return {
    'package.json': `{
  "name": "<%= packageName %>",
  "version": "1.0.0",
  "main": "src/index.js",
  "bin": {
    "<%= packageName %>": "./src/index.js"
  },
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "lint": "eslint src --ext .js",
    "format": "prettier --write "src/**/*.js"",
    "build": "babel src -d dist"
  },
  "dependencies": {
    "express": "^4.18.2",
    "@grpc/grpc-js": "^1.9.9",
    "@grpc/proto-loader": "^0.7.7"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "prettier": "^3.2.5",
    "eslint-plugin-prettier": "^5.1.3",
    "eslint-config-prettier": "^9.1.0",
    "@babel/core": "^7.24.5",
    "@babel/cli": "^7.24.4",
    "@babel/preset-env": "^7.24.5",
    "nodemon": "^3.0.3"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}`,

    'README.md': `# <%= serviceName %>

Đây là boilerplate mẫu cho một service Node.js sử dụng Express + gRPC với Clean Architecture pattern.

## Cấu trúc thư mục
\`\`\`
src/
├── proto/               # gRPC Protocol Buffers
├── controllers/         # gRPC Controllers
├── services/           # Business Logic Layer
├── repositories/       # Data Access Layer
├── models/             # Domain Models
├── index.js            # Express server
└── server.js           # gRPC server
\`\`\`

## Yêu cầu hệ thống
- Node.js 14+
- npm hoặc yarn

## Cài đặt

### 1. Cài Node.js
\`\`\`bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Hoặc từ NodeSource
curl -OL https://nodejs.org/dist/v18.19.0/node-v18.19.0-linux-x64.tar.xz
sudo tar -C /usr/local --strip-components=1 -xJf node-v18.19.0-linux-x64.tar.xz
\`\`\`

### 2. Setup project
\`\`\`bash
# Clone và setup
git clone <your-repo>
cd <%= serviceName %>

# Install dependencies
npm install

# Setup development environment
npm run dev-setup
\`\`\`

## Chạy ứng dụng

### Development mode
\`\`\`bash
npm run dev
\`\`\`

### Production mode
\`\`\`bash
npm start
\`\`\`

### Build
\`\`\`bash
npm run build
\`\`\`

## Testing

\`\`\`bash
# Chạy tests
npm test

# Chạy tests với coverage
npm run test:coverage

# Chạy linting
npm run lint
\`\`\`

## Development

### Code quality
\`\`\`bash
# Format code
npm run format

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
\`\`\`

### Generate protobuf code
\`\`\`bash
# Install protobuf compiler
sudo apt install protobuf-compiler

# Generate JavaScript code
protoc --js_out=import_style=commonjs,binary:./src/proto --grpc_out=./src/proto --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin proto/*.proto
\`\`\`

## API Endpoints

### gRPC (Port 9090)
- \`GetUser(id)\` - Lấy thông tin user theo ID
- \`CreateUser(name, email)\` - Tạo user mới
- \`ListUsers(page, size)\` - Lấy danh sách users

### HTTP (Port 3000)
- \`GET /\` - Health check
- \`GET /health\` - Health check endpoint

## Architecture Patterns

### Clean Architecture
- **Controller Layer**: Xử lý gRPC requests/responses
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

## Security Features

- Input validation
- Error handling
- Structured logging
- Rate limiting ready

## Monitoring & Observability

- Structured logging
- Request/response logging
- Performance metrics ready
- Health checks

## Deployment

### Docker
\`\`\`bash
# Build image
docker build -t <%= packageName %> .

# Run container
docker run -p 3000:3000 -p 9090:9090 <%= packageName %>
\`\`\`

### Kubernetes
\`\`\`bash
# Apply manifests
kubectl apply -f k8s/
\`\`\`

### PM2
\`\`\`bash
# Install PM2
npm install -g pm2

# Start application
pm2 start src/index.js --name "<%= serviceName %>"

# Monitor
pm2 monit
\`\`\`

## Configuration

### Environment Variables
\`\`\`bash
NODE_ENV=development
PORT=3000
GRPC_PORT=9090
LOG_LEVEL=info
\`\`\`

### Config File (config/config.js)
\`\`\`javascript
module.exports = {
  server: {
    port: process.env.PORT || 3000,
    grpcPort: process.env.GRPC_PORT || 9090
  },
  log: {
    level: process.env.LOG_LEVEL || 'info'
  }
};
\`\`\`

## Testing Strategy

### Unit Tests
- Service layer với mocked repository
- Model validation
- Business logic testing

### Integration Tests
- gRPC handler testing
- End-to-end API testing

### Performance Tests
- Load testing với Artillery
- Memory leak testing

## Performance

- gRPC cho high-performance communication
- Connection pooling ready
- Efficient memory usage
- Optimized for Node.js event loop

## CI/CD Ready

\`\`\`bash
# Run CI pipeline
npm run ci

# Production build
npm run build
\`\`\`

## Troubleshooting

### Lỗi thường gặp
1. **Port đã được sử dụng**: Thay đổi port trong config
2. **gRPC không connect**: Kiểm tra port và firewall
3. **Dependencies lỗi**: Chạy \`npm install\`

### Logs
\`\`\`bash
# Xem logs
docker logs <container-id>

# Debug mode
NODE_ENV=development DEBUG=* npm start
\`\`\`

## Best Practices

- **Error Handling**: Async/await với try-catch
- **Logging**: Structured logging với correlation IDs
- **Testing**: Jest với mocking
- **Configuration**: Environment-based config
- **Security**: Input validation, rate limiting
- **Performance**: Connection pooling, efficient algorithms

## Contributing

1. Fork repository
2. Create feature branch
3. Add tests
4. Run \`npm run ci\`
5. Submit pull request

## License

MIT License`,

    'src/proto/user.proto': `syntax = "proto3";

package user;

service UserService {
  rpc GetUser (GetUserRequest) returns (GetUserResponse);
  rpc CreateUser (CreateUserRequest) returns (CreateUserResponse);
  rpc ListUsers (ListUsersRequest) returns (ListUsersResponse);
}

message GetUserRequest {
  string id = 1;
}

message GetUserResponse {
  string id = 1;
  string name = 2;
  string email = 3;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
}

message CreateUserResponse {
  string id = 1;
  string name = 2;
  string email = 3;
}

message ListUsersRequest {
  int32 page = 1;
  int32 size = 2;
}

message ListUsersResponse {
  repeated GetUserResponse users = 1;
  int32 total = 2;
}`,

    'src/index.js': `import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from <%= serviceName %>!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: '<%= serviceName %>' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
  });
}

export default app;`,

    'src/server.js': `import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import userController from './controllers/user.controller.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, 'proto', 'user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const server = new grpc.Server();
server.addService(userProto.UserService.service, {
  GetUser: userController.getUser,
});

const PORT = process.env.GRPC_PORT || '9090';
server.bindAsync(\`0.0.0.0:\${PORT}\`, grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log(\`gRPC server running at 0.0.0.0:\${PORT}\`);
});`,

    'src/controllers/user.controller.js': `import userService from '../services/user.service.js';

const getUser = async (call, callback) => {
  try {
    const user = await userService.getUserById(call.request.id);
    callback(null, user);
  } catch (err) {
    callback(err);
  }
};

export default { getUser };`,

    'src/services/user.service.js': `import userRepository from '../repositories/user.repository.js';

const getUserById = async (id) => {
  // Business logic có thể thêm ở đây
  return userRepository.findById(id);
};

export default { getUserById };`,

    'src/repositories/user.repository.js': `const users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' }
];

const findById = async (id) => users.find(u => u.id === id);

export default { findById };`,

    'src/models/user.model.js': `// User model mẫu, có thể mở rộng khi dùng ORM/DB thực tế
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export default User;`,

    '.eslintrc.json': `{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error"
  }
}`,

    '.prettierrc': `{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100
}`,

    '.babelrc': `{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}`
  };
}

module.exports = { getJSTemplates }; 