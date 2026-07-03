#!/bin/bash
# 기존에 존재하던 파일 제거 (필요에 따라 백업 명령어로 대체 가능)
if [ -d "/var/www/blog.techflow.local/" ]; then
    rm -rf /var/www/blog.techflow.local/*
fi
