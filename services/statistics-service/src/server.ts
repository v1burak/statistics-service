import 'dotenv/config';
import { config } from './config/environment';
import app from './app';

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});