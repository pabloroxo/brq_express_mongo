/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Autenticação]
 *     summary: Registrar usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               mail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cadastrado com sucesso
 *       400:
 *         description: Erro em algum dado informado
 *       409:
 *         description: E-mail já existente na base de dados
 *       500:
 *         description: Erro do sistema
 * 
 * /auth/authenticate:
 *   post:
 *     tags: [Autenticação]
 *     summary: Autenticar usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticado com sucesso
 *       400:
 *         description: Erro em algum dado informado
 *       401:
 *         description: A senha está incorreta
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro do sistema
 */