const express = require('express');
const client = require('prom-client');

const app = express();
const register = client.register;

// Custom metrics
const deploymentCounter = new client.Counter({
  name: 'app_deployments_total',
  help: 'Total number of deployments',
  labelNames: ['service', 'status']
});

const alertGauge = new client.Gauge({
  name: 'simulated_alerts_active',
  help: 'Current number of active simulated alerts',
  labelNames: ['severity']
});

// Simulate metrics update
setInterval(() => {
  deploymentCounter.inc({ service: 'frontend', status: 'success' });
  deploymentCounter.inc({ service: 'backend', status: 'failed' });

  const alerts = Math.floor(Math.random() * 5);
  alertGauge.set({ severity: 'critical' }, alerts);
}, 5000);

// Expose metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(4000, () => {
  console.log('Metrics server running on port 4000');
});
