import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('Sistema de Vendas - API')
  .setVersion('0.0.0')
  .build();
