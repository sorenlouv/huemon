# Installation

### Clone huemon

```
cd /opt
sudo mkdir /opt/huemon
sudo chown pi:pi /opt/huemon
git clone https://github.com/sqren/huemon.git
cd huemon
yarn
```

### Create Config

```
cd /opt/huemon
touch .env
```

Update `/opt/huemon/.env` with the following example config:

[Hue API key](https://developers.meethue.com/develop/hue-api-v2/getting-started/)
[Awair Developer Console](https://developer.getawair.com/console/access-token)

```
# Hue
HUE_API_HOST = http://192.168.1.111
HUE_API_KEY = verysecret

# Awair
AWAIR_DEVICE_TYPE = awair-element
AWAIR_DEVICE_ID = 1234
AWAIR_TOKEN = verysecret

# Elastic
ELASTIC_USERNAME = elastic
ELASTIC_PASSWORD = changeme
ELASTIC_CLOUD_ID = cloudname:verysecret

```

```

# Create service file for systemd
sudo cp /opt/huemon/etc/huemon.service /etc/systemd/system/huemon.service

# Restart after changing systemd file
sudo systemctl daemon-reload

# Start
sudo systemctl start huemon

# Start on boot
sudo systemctl enable huemon

# Confirm status
sudo systemctl status huemon

# View logs
journalctl -fu huemon.service -n 100
```
