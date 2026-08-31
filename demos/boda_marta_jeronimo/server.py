#!/usr/bin/env python3
"""
Simple HTTP server for Marta & Jerónimo Wedding Landing Page
Serves on localhost:3000 (or next available port)
"""

import http.server
import socketserver
import os
import sys

DIRECTORY = os.path.dirname(os.path.abspath(__file__))
PREFERRED_PORTS = [3000, 8000, 8080, 5000, 4000]

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable aggressive caching for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    
    server = None
    selected_port = None

    for port in PREFERRED_PORTS:
        try:
            socketserver.TCPServer.allow_reuse_address = True
            server = socketserver.TCPServer(("", port), CustomHandler)
            selected_port = port
            break
        except OSError:
            continue

    if not server:
        print("Error: Could not bind to any preferred port.", file=sys.stderr)
        sys.exit(1)

    print(f"=== Servidor Local Iniciado ===")
    print(f"Landing page de boda Marta & Jerónimo disponible en:")
    print(f"-> http://localhost:{selected_port}/")
    print(f"Directorio servido: {DIRECTORY}")
    print(f"Presiona Ctrl+C para detener el servidor.")
    sys.stdout.flush()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido correctamente.")
        server.server_close()

if __name__ == "__main__":
    run_server()
