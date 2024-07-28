/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - All Fields
 *       properties:
 *         name:
 *           type: string
 *           description: full name of user
 *         email:
 *           type: string
 *           description: user email adress
 *         valideEmail:
 *           type: boolean
 *           description: is Email valid
 *         Avatar:
 *           type : String
 *           description : user image
 *         phone :
 *           type : number
 *           description : phone number
 *         businessname:
 *           type : String
 *           description : "delivery service name"
 *         headquarter :
 *            type : Object
 *            description : "deslivery adresss"
 *         role:
 *            type: String,
 *            enum: ["user", "admin", "deliverycompanie", "colector"]
 *            description : Role of user
 *         password :
 *              type : String
 *         paswodConfirm :
 *              type : String
 *         businessinfo:
 *            type : Object
 *            description : adress of user  if user role is deliverycomanie
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API EndPoints
 *
 */

/**
 * @swagger
 * /api/v1/users/activer/:userid:
 *    patch:
 *      summary : activate and send generated password to the user
 *      tags : [User]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/User'
 *      responses :
 *           200:
 *             description : The password has been sent successfully
 */

/**
 * @swagger
 * /api/v1/users/desactive/:userid:
 *    patch:
 *      summary : desactive user account
 *      tags : [User]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/User'
 *      responses :
 *           200:
 *             description : The account has been desactivated successfully
 */

/**
 * @swagger
 * /api/v1/users/getUser/:userId:
 *    get:
 *      summary : get user by id
 *      tags : [User]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/User'
 *      responses :
 *           200:
 *             description : user returned successfully
 */

/**
 * @swagger
 * /api/v1/users/getMe:
 *    get:
 *      summary : get authenticated user info
 *      tags : [User]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   Link
 *      responses :
 *           200:
 *             description : get authenticated user info
 */

/**
 * @swagger
 * /api/v1/users/upload/user/avatar:
 *    patch:
 *      summary : update user image / avatar
 *      tags : [User]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                  $ref : '#/components/schemas/User'
 *      responses :
 *           200:
 *             description : Info has been updated
 *
 */
