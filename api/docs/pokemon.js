/**
 * @swagger
 * /pokemon:
 *   get:
 *     tags: [Pokémon]
 *     summary: Listar pokémons
 *     security: 
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado com sucesso
 *       401:
 *         description: Token incorreto, inválido ou expirado
 *       500:
 *         description: Erro do sistema
 *   post:
 *     tags: [Pokémon]
 *     summary: Registrar pokémon
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pokemonId:
 *                 type: integer
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrado com sucesso
 *       401:
 *         description: Token incorreto, inválido ou expirado
 *       409:
 *         description: Pokémon ID já existente na base de dados
 *       500:
 *         description: Erro do sistema
 *
 * /pokemon/{pokemonId}:
 *   get:
 *     tags: [Pokémon]
 *     summary: Detalhar pokémon
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pokemonId
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Detalhado com sucesso
 *       401:
 *         description: Token incorreto, inválido ou expirado
 *       404:
 *         description: Pokémon não encontrado
 *       500:
 *         description: Erro do sistema
 * 
 *   put:
 *     tags: [Pokémon]
 *     summary: Editar pokémon
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pokemonId
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pokemonId:
 *                 type: integer
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Editado com sucesso
 *       401:
 *         description: Token incorreto, inválido ou expirado
 *       404:
 *         description: Pokémon não encontrado
 *       409:
 *         description: Pokémon ID já existente na base de dados
 *       500:
 *         description: Erro do sistema
 * 
 *   delete:
 *     tags: [Pokémon]
 *     summary: Deletar pokémon
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pokemonId
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Deletado com sucesso
 *       401:
 *         description: Token incorreto, inválido ou expirado
 *       500:
 *         description: Erro do sistema
 */