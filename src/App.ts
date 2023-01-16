import express from 'express';
import helmet from 'helmet';
import routes from './routes/Index';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json'

// criação de uma instância do express/servidor http
const app = express();
app.use(helmet()); // https://helmetjs.github.io/

// middleware para converter o body das requisições para json
app.use(express.json());

// documentação com o swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// middleware de tratamento de todas as rotas
app.use('/', routes);

export default app;
