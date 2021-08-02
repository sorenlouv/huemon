# Installation

### Clone huemon

```
cd /opt
sudo mkdir -p /opt/huemon
sudo chown -R pi:pi /opt/huemon
git clone https://github.com/sqren/huemon.git
```

### Create Config

```
cd /opt/huemon
touch .env
```

Update `/opt/huemon/.env` with the following example config:

```
HUE_API_HOST = http://192.168.1.111
HUE_API_KEY = k-abcdef

ELASTIC_USERNAME = elastic
ELASTIC_PASSWORD = changeme
ELASTIC_CLOUD_ID = somename:abcd==
```

```

# Create service file for systemd
sudo cp /opt/huemon/etc/huemon.service /etc/systemd/system/huemon.service

# Start
sudo systemctl start huemon

# Start on boot
sudo systemctl enable huemon

# Confirm status
sudo systemctl status huemon

# View logs
journalctl -fu huemon.service -n 100

# Restart after changing systemd file
sudo systemctl daemon-reload
```
