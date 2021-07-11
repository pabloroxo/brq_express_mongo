/**
 * @swagger
 * /usuario:
 *   put:
 *     tags: [Usuário]
 *     summary: Editar usuário
 *     security:
 *       - bearerAuth: []
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
 *       200:
 *         description: Editado com sucesso
 *       400:
 *         description: Erro em algum dado informado
 *       401:
 *         description: Token incorreto, inválido ou expirado
 *       409:
 *         description: E-mail já existente na base de dados
 *       500:
 *         description: Erro do sistema
 */