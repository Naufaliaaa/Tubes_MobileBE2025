/**
 * @swagger
 * 
 * 
 * /posts/getPosts:
 *  get:
 *   summary: Mengambil Semua Postingan
 *   tags: [User]
 * 
 *   responses:
 *    200:
 *     description: berhasil mengambil semua data postingan
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal server error
 *
 * 
 * /posts/createPosts:
 *  post:
 *   summary: Mmebuat Postingan Baru
 *   tags: [User]
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           title:
 *              description: username user (required, alphanumeric, min length 3, max length 30)
 *              type: string
 *              example: exampleuser
 *           deskripsi:
 *             description: bio user (optional, max length 160)
 *             type: string
 *             example: This is my bio
 * 
 *   responses:
 *    201:
 *     description: berhasil membuat postingan baru
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal server error
 * 
 */