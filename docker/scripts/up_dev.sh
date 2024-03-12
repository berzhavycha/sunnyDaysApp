ENV_FILE="../../server/.env"

if [ -f "$ENV_FILE" ]; then
    CLIENT=$(grep -E '^\s*CLIENT\s*=' "$ENV_FILE" | cut -d '=' -f2 | tr -d '[:space:]')
    CLIENT="${CLIENT%"${CLIENT##*[![:space:]]}"}"  
    CLIENT="${CLIENT#"${CLIENT%%[![:space:]]*}"}"

    echo "Client specified in .env file: $CLIENT"

    if [ "$CLIENT" = "web" ]; then 
        echo "Running docker-compose-dev for web"
        docker-compose --env-file ../../server/.env -f ../docker-compose-dev.yml up --build -d
    else
        echo "Running docker-compose-dev for mobile"
        docker-compose --env-file ../../server/.env -f ../docker-compose-dev.yml up --build -d server postgres redis
    fi
else
    echo ".env file not found in the server directory"
    exit 1
fi
