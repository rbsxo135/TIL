#!/bin/bash
# Nginx 설정 파일에 이상이 없는지 먼저 테스트 후 Reload
nginx -t && systemctl reload nginx
