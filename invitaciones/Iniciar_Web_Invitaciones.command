#!/bin/bash
cd "$(dirname "$0")"
echo "============================================================"
echo "✨ Iniciando Catálogo de Invitaciones Web en Localhost..."
echo "============================================================"

# Levantar servidor en segundo plano
python3 server.py 3000 &
SERVER_PID=$!

sleep 1
# Abrir en el navegador predeterminado
open "http://localhost:3000/catalogo/"

echo "Servidor iniciado con PID $SERVER_PID. Presiona Ctrl+C para detenerlo."
wait $SERVER_PID
