# syntax=docker/dockerfile:1

FROM python:3.12

# System packages often needed by Python libs (psycopg2, lxml, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*


# Establish application workspace
WORKDIR /app

# ----- Install Python dependencies first (leverages cache) -----
# Provide either requirements.txt or pyproject.toml — adjust as needed
COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# ----- Copy project source -----
COPY . .

EXPOSE 8000

# Default dev‑oriented entrypoint (Compose może to nadpisać)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
