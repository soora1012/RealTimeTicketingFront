import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// 경로 별칭(@) 설정용
import path from "path"

function removeComments() {
  return {
    name: "remove-comments",

    enforce: "pre",

    transform(code, id) {

      // node_modules 제외
      if (id.includes("node_modules")) {
        return;
      }

      // vue/js/ts 만 처리
      if (
        id.endsWith(".vue") ||
        id.endsWith(".js") ||
        id.endsWith(".ts")
      ) {

        // block comment 제거
        let transformed = code.replace(
          /\/\*[\s\S]*?\*\//g,
          ""
        );

        // line comment 제거
        transformed = transformed.replace(
          /(^|[^:])\/\/.*$/gm,
          "$1"
        );

        return {
          code: transformed,
          map: null,
        };
      }
    },
  };
}


export default defineConfig({

  // Vue 플러그인 등록
  plugins: [removeComments(), vue()],

  // 개발 서버 설정
  server: {

    // localhost:3001 로 실행
    port: 3001,
  },

  // import 경로 별칭 설정
  resolve: {
    alias: {

      // @ -> src 폴더 의미
      // 예:
      // import * as api from "@/api"
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // console.log 제거
        drop_debugger: true, // debugger 제거
      },

      format: {
        comments: false, // 주석 제거
      },
    },
  }
})