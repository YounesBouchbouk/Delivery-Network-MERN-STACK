/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and Autorisation API EndPoints
 *
 */

/**
 * @swagger
 * /api/v1/users/signup:
 *    post:
 *      summary : return user info and acesses token to the signed up user
 *      tags : [Authentication]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/User'
 *      responses :
 *           200:
 *             description : The user is successfuly signed up into our application
 */

/**
 * @swagger
 * /api/v1/users/login:
 *    post:
 *      summary : return  some user information from database and store created token in cookies
 *      tags : [Authentication]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/User'
 *      responses :
 *           200:
 *             description : The user is successfuly loged   into our application
 */

/**
 * @swagger
 * /api/v1/users/forgetpassword:
 *    get:
 *      summary : send restore password link to user email
 *      tags : [Authentication]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   Link
 *      responses :
 *           200:
 *             description : Token Link has been sent successfully
 */

/**
 * @swagger
 * /api/v1/users/resetpassword/:token:
 *    patch:
 *      summary : restore user Password
 *      tags : [Authentication]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   password :
 *                      type : String
 *                   ConfirmPassword :
 *                      type : String
 *      responses :
 *           200:
 *             description : Token Link has been sent successfully
 *           400 :
 *             description : Token is Invalid
 */

/**
 * @swagger
 * /api/v1/users/forgetpassword:
 *    get:
 *      summary : send restore password link to user email
 *      tags : [Authentication]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   Link
 *      responses :
 *           200:
 *             description : Token Link has been sent successfully
 */

/**
 * @swagger
 * /api/v1/users/sendEmailVerificationToken:
 *    get:
 *      summary : Resend Email verfication token to the user Email adress
 *      tags : [Authentication]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *
 *      responses :
 *           200:
 *             description : Token Link has been sent successfully
 */

/**
 * @swagger
 * /api/v1/users/emailValidation/:token:
 *    get:
 *      summary : Validate user Email
 *      tags : [Authentication]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *
 *      responses :
 *           200:
 *             description : Email has been verified successfully
 */

/**
 * @swagger
 * /api/v1/users/emailValidation/:token:
 *    get:
 *      summary : Validate user Email
 *      tags : [Authentication]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *
 *      responses :
 *           200:
 *             description : Email has been verified successfully
 */
