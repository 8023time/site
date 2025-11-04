---
title: "#include <unistd.h>"
date: 2025-6-17
updated:
tags:
  - C/C++
categories: C/C++
keywords:
description:
top_img:
comments:
cover: https://cdn.jsdelivr.net/gh/8023time/image-storage-address/C/C++-image/74b8bdb2ef6f685e13ca6d5921cf4ab.png
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
abcjs:
---

# include <unistd.h>

## 1.介绍

> `<unistd.h>`（UNIX Standard Header）是 **POSIX 操作系统 API** 的核心头文件之一，主要用于 **Unix/Linux 系统编程**。它提供了大量与 **系统调用（System Calls）** 相关的函数，涵盖 **文件操作、进程控制、系统信息、终端管理、管道通信** 等核心功能。

|   **功能类别**    |                                **主要函数**                                |
| :---------------: | :------------------------------------------------------------------------: |
|   **文件操作**    |      `read()`, `write()`, `close()`, `unlink()`, `lseek()`, `fsync()`      |
|   **进程控制**    | `fork()`, `exec()`, `getpid()`, `getppid()`, `exit()`, `_exit()`, `wait()` |
|   **系统信息**    |            `gethostname()`, `getcwd()`, `chdir()`, `sysconf()`             |
|   **时间管理**    |           `sleep()`, `usleep()`（已弃用，建议用 `nanosleep()`）            |
| **终端/设备管理** |           `isatty()`, `ttyname()`, `tcgetpgrp()`, `tcsetpgrp()`            |
|   **管道通信**    |                                  `pipe()`                                  |
| **用户/权限管理** |  `getuid()`, `geteuid()`, `getgid()`, `getegid()`, `setuid()`, `setgid()`  |
| **符号链接管理**  |                         `symlink()`, `readlink()`                          |

---

## **2. 核心函数详解**

### **2.1 文件操作（File I/O）**

#### **(1) `read()` - 从文件描述符读取数据**

```c
ssize_t read(int fd, void *buf, size_t count);
```

- **功能**：从文件描述符 `fd` 读取最多 `count` 字节到 `buf`。

- 返回值：

  - 成功：返回实际读取的字节数（可能小于 `count`）。
  - 失败：返回 `-1`，并设置 `errno`。

  ```c
  #include <unistd.h>
  #include <fcntl.h>

  int main() {
      int fd = open("test.txt", O_RDONLY);
      char buf[100];
      ssize_t bytes_read = read(fd, buf, sizeof(buf));
      if (bytes_read > 0) {
          write(STDOUT_FILENO, buf, bytes_read); // 输出到终端
      }
      close(fd);
      return 0;
  }
  ```

#### **(2) `write()` - 向文件描述符写入数据**

```c
ssize_t write(int fd, const void *buf, size_t count);
```

- **功能**：将 `buf` 中的 `count` 字节写入 `fd`。

- 返回值：

  - 成功：返回实际写入的字节数。
  - 失败：返回 `-1`，并设置 `errno`。

  ```c
  #include <unistd.h>
  #include <fcntl.h>

  int main() {
      int fd = open("output.txt", O_WRONLY | O_CREAT, 0644);
      const char *msg = "Hello, World!\n";
      write(fd, msg, strlen(msg));
      close(fd);
      return 0;
  }
  ```

#### **(3) `close()` - 关闭文件描述符**

```c
int close(int fd);
```

- **功能**：关闭文件描述符 `fd`，释放系统资源。
- 返回值：
  - 成功：`0`。
  - 失败：`-1`（如 `fd` 无效）。

#### **(4) `unlink()` - 删除文件**

```c
int unlink(const char *pathname);
```

- **功能**：删除文件（类似 `rm` 命令）。

- 示例：

  ```c
  unlink("tempfile.txt"); // 删除文件
  ```

---

### **2.2 进程控制（Process Control）**

#### **(1) `fork()` - 创建子进程**

```c
pid_t fork(void);
```

- **功能**：复制当前进程，创建一个 **子进程**。

- 返回值：

  - **父进程**：返回子进程的 `PID`（> 0）。
  - **子进程**：返回 `0`。
  - **失败**：返回 `-1`（如内存不足）。

- 示例：

  ```c
  #include <unistd.h>
  #include <stdio.h>

  int main() {
      pid_t pid = fork();
      if (pid == 0) {
          printf("Child Process (PID=%d)\n", getpid());
      } else {
          printf("Parent Process (Child PID=%d)\n", pid);
      }
      return 0;
  }
  ```

#### **(2) `exec()` 系列 - 执行新程序**

```c
int execl(const char *path, const char *arg0, ..., NULL);
int execv(const char *path, char *const argv[]);
int execvp(const char *file, char *const argv[]);
```

- **功能**：替换当前进程映像，运行新程序。

- 示例：

  ```c
  execl("/bin/ls", "ls", "-l", NULL); // 执行 `ls -l`
  ```

#### **(3) `exit()` vs `_exit()`**

| **函数**  |                                **行为**                                 |
| :-------: | :---------------------------------------------------------------------: |
| `exit()`  | 标准 C 库函数，会调用 `atexit()` 注册的函数，刷新缓冲区，然后终止进程。 |
| `_exit()` |              直接终止进程，不刷新缓冲区（属于系统调用）。               |

- 示例：

  ```c
  #include <stdlib.h>
  #include <unistd.h>

  int main() {
      printf("This will be printed\n");
      // exit(0);    // 会刷新缓冲区
      _exit(0);      // 直接终止，可能不打印
  }
  ```

---

### **2.3 系统信息（System Information）**

#### **(1) `getpid()` / `getppid()` - 获取进程 ID**

```c
pid_t getpid(void);  // 获取当前进程 PID
pid_t getppid(void); // 获取父进程 PID
```

#### **(2) `gethostname()` - 获取主机名**

```c
int gethostname(char *name, size_t len);
```

- 示例：

  ```c
  char hostname[100];
  gethostname(hostname, sizeof(hostname));
  printf("Hostname: %s\n", hostname);
  ```

#### **(3) `getcwd()` - 获取当前工作目录**

```c
char *getcwd(char *buf, size_t size);
```

- 示例：

  ```c
  char cwd[1024];
  getcwd(cwd, sizeof(cwd));
  printf("Current dir: %s\n", cwd);
  ```

---

### **2.4 时间管理（Time Management）**

#### **(1) `sleep()` - 暂停执行（秒级）**

```c
unsigned int sleep(unsigned int seconds);
```

- 示例：

  ```c
  sleep(2); // 暂停 2 秒
  ```

#### **(2) `usleep()` - 暂停执行（微秒级，已弃用）**

```c
int usleep(useconds_t usec); // 1 秒 = 1,000,000 微秒
```

- **替代方案**：`nanosleep()`（更精确）。

---

## **3. 高级用法**

### **(1) 管道通信（`pipe()`）**

```c
int pipe(int pipefd[2]);
```

- **功能**：创建匿名管道，`pipefd[0]` 用于读，`pipefd[1]` 用于写。

- 示例：

  ```c
  int fd[2];
  pipe(fd);
  if (fork() == 0) {
      close(fd[0]); // 子进程关闭读端
      write(fd[1], "Hello", 6);
  } else {
      close(fd[1]); // 父进程关闭写端
      char buf[10];
      read(fd[0], buf, sizeof(buf));
      printf("Received: %s\n", buf);
  }
  ```

### **(2) 文件描述符重定向（`dup2()`）**

```c
int dup2(int oldfd, int newfd);
```

- **功能**：复制 `oldfd` 到 `newfd`，可用于重定向输入/输出。

- 示例：

  ```c
  int fd = open("output.txt", O_WRONLY | O_CREAT, 0644);
  dup2(fd, STDOUT_FILENO); // 标准输出重定向到文件
  printf("This goes to output.txt\n");
  ```

---

## **4. 注意事项**

1. **平台兼容性**：

   - `<unistd.h>` 是 **Unix/Linux 特有**，Windows 不原生支持（但可通过 MinGW/Cygwin 兼容）。
   - Windows 替代方案：`<windows.h>` + `CreateProcess()`, `ReadFile()`, `WriteFile()` 等。

2. **错误处理**：

   - 大多数函数失败时返回`-1`，并设置`errno`，建议检查返回值：

     ```c
     if (write(fd, buf, len) == -1) {
         perror("write failed");
     }
     ```

3. **缓冲区管理**：

   - `write()` 不一定一次性写完所有数据，可能需要循环写入。

---

## **5. 总结**

`<unistd.h>` 是 **Unix/Linux 系统编程的核心头文件**，提供了：

- **文件 I/O**（`read`, `write`, `close`）
- **进程管理**（`fork`, `exec`, `exit`）
- **系统信息**（`getpid`, `gethostname`, `getcwd`）
- **时间管理**（`sleep`, `usleep`）
- **管道和重定向**（`pipe`, `dup2`）

适用于 **系统工具开发、Shell 实现、守护进程（Daemon）、多进程编程** 等场景。
