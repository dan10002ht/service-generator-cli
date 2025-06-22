function getJavaTemplates() {
  return {
    'pom.xml': `<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId><%= packageName %></artifactId>
    <version>1.0.0</version>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
    </parent>
    
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <grpc.version>1.62.2</grpc.version>
        <protobuf.version>4.26.1</protobuf.version>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- gRPC dependencies -->
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-netty-shaded</artifactId>
            <version>\${grpc.version}</version>
        </dependency>
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-protobuf</artifactId>
            <version>\${grpc.version}</version>
        </dependency>
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-stub</artifactId>
            <version>\${grpc.version}</version>
        </dependency>
        
        <!-- Spring Boot gRPC -->
        <dependency>
            <groupId>net.devh</groupId>
            <artifactId>grpc-server-spring-boot-starter</artifactId>
            <version>3.1.0</version>
        </dependency>
        
        <!-- Test dependencies -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-testing</artifactId>
            <version>\${grpc.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <extensions>
            <extension>
                <groupId>kr.motd.maven</groupId>
                <artifactId>os-maven-plugin</artifactId>
                <version>1.7.1</version>
            </extension>
        </extensions>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            
            <!-- gRPC Maven Plugin -->
            <plugin>
                <groupId>org.xolstice.maven.plugins</groupId>
                <artifactId>protobuf-maven-plugin</artifactId>
                <version>0.6.1</version>
                <configuration>
                    <protocArtifact>com.google.protobuf:protoc:\${protobuf.version}:exe:\${os.detected.classifier}</protocArtifact>
                    <pluginId>grpc-java</pluginId>
                    <pluginArtifact>io.grpc:protoc-gen-grpc-java:\${grpc.version}:exe:\${os.detected.classifier}</pluginArtifact>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>compile</goal>
                            <goal>compile-custom</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            
            <!-- Checkstyle Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-checkstyle-plugin</artifactId>
                <version>3.3.1</version>
                <configuration>
                    <configLocation>google_checks.xml</configLocation>
                </configuration>
            </plugin>
            
            <!-- Spotless Plugin -->
            <plugin>
                <groupId>com.diffplug.spotless</groupId>
                <artifactId>spotless-maven-plugin</artifactId>
                <version>2.43.0</version>
                <configuration>
                    <java>
                        <googleJavaFormat>
                            <version>1.19.2</version>
                            <style>GOOGLE</style>
                        </googleJavaFormat>
                    </java>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`,

    'README.md': `# <%= serviceName %>

Đây là boilerplate mẫu cho một service Java sử dụng Spring Boot + gRPC với Clean Architecture pattern.

## Cấu trúc thư mục
\`\`\`
src/
├── main/
│   ├── java/com/example/
│   │   ├── controller/      # gRPC Controllers
│   │   ├── service/         # Business Logic Layer
│   │   ├── repository/      # Data Access Layer
│   │   ├── model/           # Domain Models
│   │   └── SampleJavaServiceApplication.java
│   ├── proto/               # gRPC Protocol Buffers
│   └── resources/
│       └── application.yml  # Configuration
└── test/
    └── java/com/example/    # Unit Tests
\`\`\`

## Yêu cầu hệ thống
- Java 17+
- Maven 3.6+
- Protocol Buffers Compiler

## Build & Run

### Build project
\`\`\`bash
mvn clean compile
\`\`\`

### Chạy service
\`\`\`bash
mvn spring-boot:run
\`\`\`

Service sẽ chạy trên:
- HTTP Server: http://localhost:8080
- gRPC Server: localhost:9090

### Test gRPC service
\`\`\`bash
# Chạy unit tests
mvn test

# Chạy integration tests
mvn verify
\`\`\`

## Development Tools

### Code Style & Quality
\`\`\`bash
# Kiểm tra code style (Checkstyle)
mvn checkstyle:check

# Format code (Spotless)
mvn spotless:apply

# Kiểm tra format
mvn spotless:check
\`\`\`

### Generate gRPC code
\`\`\`bash
# Generate Java classes từ .proto files
mvn protobuf:compile
mvn protobuf:compile-custom
\`\`\`

## API Endpoints

### gRPC Services
- \`GetUser(id)\` - Lấy thông tin user theo ID
- \`CreateUser(name, email)\` - Tạo user mới
- \`ListUsers(page, size)\` - Lấy danh sách users với phân trang

### HTTP Endpoints (nếu cần)
- \`GET /health\` - Health check
- \`GET /actuator\` - Spring Boot Actuator

## Pattern sử dụng

### Clean Architecture
- **Controller Layer**: Xử lý gRPC requests/responses
- **Service Layer**: Business logic
- **Repository Layer**: Data access
- **Model Layer**: Domain entities

### Repository Pattern
- Tách biệt logic truy cập dữ liệu
- Dễ test và mock
- Dễ thay đổi implementation

## Testing

### Unit Tests
- Sử dụng JUnit 5
- Mockito cho mocking
- Test coverage cho Service layer

### Integration Tests
- Test gRPC endpoints
- Test với real repository

## Deployment

### Build JAR
\`\`\`bash
mvn clean package
\`\`\`

### Run JAR
\`\`\`bash
java -jar target/<%= packageName %>-1.0.0.jar
\`\`\`

## Monitoring & Logging
- Spring Boot Actuator cho health checks
- Logging với SLF4J
- Metrics với Micrometer

## Troubleshooting

### Lỗi thường gặp
1. **Port đã được sử dụng**: Thay đổi port trong \`application.yml\`
2. **gRPC code không generate**: Chạy \`mvn clean compile\`
3. **Test fail**: Kiểm tra Java version và dependencies`,

    'src/main/proto/user.proto': `syntax = "proto3";

package user;

option java_multiple_files = true;
option java_package = "com.example.grpc";
option java_outer_classname = "UserProto";

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

    'src/main/java/com/example/SampleJavaServiceApplication.java': `package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SampleJavaServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(SampleJavaServiceApplication.class, args);
    }
}`,

    'src/main/java/com/example/controller/UserGrpcController.java': `package com.example.controller;

import com.example.service.UserService;
import com.example.model.User;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import user.UserServiceGrpc;
import user.UserOuterClass.*;

@GrpcService
public class UserGrpcController extends UserServiceGrpc.UserServiceImplBase {
    @Autowired
    private UserService userService;

    @Override
    public void getUser(GetUserRequest request, StreamObserver<GetUserResponse> responseObserver) {
        try {
            User user = userService.getUserById(request.getId());
            GetUserResponse response = GetUserResponse.newBuilder()
                .setId(user.getId())
                .setName(user.getName())
                .setEmail(user.getEmail())
                .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } catch (Exception e) {
            responseObserver.onError(e);
        }
    }

    @Override
    public void createUser(CreateUserRequest request, StreamObserver<CreateUserResponse> responseObserver) {
        try {
            User user = userService.createUser(request.getName(), request.getEmail());
            CreateUserResponse response = CreateUserResponse.newBuilder()
                .setId(user.getId())
                .setName(user.getName())
                .setEmail(user.getEmail())
                .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } catch (Exception e) {
            responseObserver.onError(e);
        }
    }

    @Override
    public void listUsers(ListUsersRequest request, StreamObserver<ListUsersResponse> responseObserver) {
        try {
            List<User> users = userService.listUsers(request.getPage(), request.getSize());
            List<GetUserResponse> userResponses = users.stream()
                .map(user -> GetUserResponse.newBuilder()
                    .setId(user.getId())
                    .setName(user.getName())
                    .setEmail(user.getEmail())
                    .build())
                .collect(Collectors.toList());
            
            ListUsersResponse response = ListUsersResponse.newBuilder()
                .addAllUsers(userResponses)
                .setTotal(users.size())
                .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } catch (Exception e) {
            responseObserver.onError(e);
        }
    }
}`,

    'src/main/java/com/example/service/UserService.java': `package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUserById(String id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public User createUser(String name, String email) {
        User user = new User(UUID.randomUUID().toString(), name, email);
        return userRepository.save(user);
    }

    public List<User> listUsers(int page, int size) {
        return userRepository.findAll(page, size);
    }
}`,

    'src/main/java/com/example/repository/UserRepository.java': `package com.example.repository;

import com.example.model.User;
import org.springframework.stereotype.Repository;
import java.util.Map;

@Repository
public class UserRepository {
    private static final Map<String, User> users = Map.of(
        "1", new User("1", "Alice", "alice@example.com"),
        "2", new User("2", "Bob", "bob@example.com")
    );

    public Optional<User> findById(String id) {
        return Optional.ofNullable(users.get(id));
    }

    public User save(User user) {
        users.put(user.getId(), user);
        return user;
    }

    public List<User> findAll(int page, int size) {
        return users.values().stream()
            .skip((long) page * size)
            .limit(size)
            .toList();
    }
}`,

    'src/main/java/com/example/model/User.java': `package com.example.model;

public class User {
    private String id;
    private String name;
    private String email;

    public User(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}`,

    'src/main/resources/application.yml': `server:
  port: 8080

grpc:
  server:
    port: 9090

spring:
  application:
    name: <%= serviceName %>

logging:
  level:
    com.example: DEBUG
    net.devh.boot.grpc: DEBUG`,

    'src/test/java/com/example/UserServiceTest.java': `package com.example;

import com.example.model.User;
import com.example.service.UserService;
import com.example.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserById_ShouldReturnUser_WhenUserExists() {
        // Given
        String userId = "1";
        User expectedUser = new User(userId, "Alice", "alice@example.com");
        when(userRepository.findById(userId)).thenReturn(Optional.of(expectedUser));

        // When
        User actualUser = userService.getUserById(userId);

        // Then
        assertNotNull(actualUser);
        assertEquals(expectedUser.getId(), actualUser.getId());
        assertEquals(expectedUser.getName(), actualUser.getName());
        assertEquals(expectedUser.getEmail(), actualUser.getEmail());
    }
}`,

    'google_checks.xml': `<?xml version="1.0"?>
<!DOCTYPE module PUBLIC
          "-//Checkstyle//DTD Checkstyle Configuration 1.3//EN"
          "https://checkstyle.org/dtds/configuration_1_3.dtd">

<module name="Checker">
    <property name="charset" value="UTF-8"/>
    <property name="severity" value="warning"/>
    <property name="fileExtensions" value="java, properties, xml"/>

    <!-- Excludes all 'module-info.java' files -->
    <module name="BeforeExecutionExclusionFileFilter">
        <property name="fileNamePattern" value="module-info\.java$"/>
    </module>

    <!-- Checks for Size Violations. -->
    <module name="FileLength">
        <property name="max" value="2000"/>
    </module>

    <!-- Checks for Naming Conventions. -->
    <module name="ConstantName"/>
    <module name="LocalFinalVariableName"/>
    <module name="LocalVariableName"/>
    <module name="MemberName"/>
    <module name="MethodName"/>
    <module name="PackageName"/>
    <module name="ParameterName"/>
    <module name="StaticVariableName"/>
    <module name="TypeName"/>

    <!-- Checks for imports -->
    <module name="AvoidStarImport"/>
    <module name="IllegalImport"/>
    <module name="RedundantImport"/>
    <module name="UnusedImports">
        <property name="processJavadoc" value="false"/>
    </module>

    <!-- Checks for Size Violations. -->
    <module name="MethodLength">
        <property name="max" value="150"/>
    </module>
    <module name="ParameterNumber">
        <property name="max" value="7"/>
    </module>

    <!-- Checks for whitespace -->
    <module name="EmptyForIteratorPad"/>
    <module name="GenericWhitespace"/>
    <module name="MethodParamPad"/>
    <module name="NoWhitespaceAfter"/>
    <module name="NoWhitespaceBefore"/>
    <module name="OperatorWrap"/>
    <module name="ParenPad"/>
    <module name="TypecastParenPad"/>
    <module name="WhitespaceAfter"/>
    <module name="WhitespaceAround"/>

    <!-- Modifier Checks -->
    <module name="ModifierOrder"/>
    <module name="RedundantModifier"/>

    <!-- Checks for blocks -->
    <module name="AvoidNestedBlocks"/>
    <module name="EmptyBlock"/>
    <module name="LeftCurly"/>
    <module name="NeedBraces"/>
    <module name="RightCurly"/>

    <!-- Checks for common coding problems -->
    <module name="EmptyStatement"/>
    <module name="EqualsHashCode"/>
    <module name="HiddenField">
        <property name="ignoreSetter" value="true"/>
        <property name="ignoreConstructorParameter" value="true"/>
    </module>
    <module name="IllegalInstantiation"/>
    <module name="InnerAssignment"/>
    <module name="MagicNumber"/>
    <module name="MissingSwitchDefault"/>
    <module name="SimplifyBooleanExpression"/>
    <module name="SimplifyBooleanReturn"/>

    <!-- Checks for class design -->
    <module name="DesignForExtension"/>
    <module name="FinalClass"/>
    <module name="HideUtilityClassConstructor"/>
    <module name="InterfaceIsType"/>
    <module name="VisibilityModifier"/>

    <!-- Miscellaneous other checks. -->
    <module name="ArrayTypeStyle"/>
    <module name="FinalParameters"/>
    <module name="TodoComment"/>
    <module name="UpperEll"/>

</module>`
  };
}

module.exports = { getJavaTemplates }; 