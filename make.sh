#!/usr/bin/env bash
clear && docker-compose down --timeout 0 && docker-compose up -d --build && docker logs --follow redacted-bot
