const express = require('express');
const logger = require('log4js').getLogger();

const { version } = require('../../package.json');

const router = express.Router();

const component = {
  title: 'API',
  version,
};

const statuses = Object.freeze({
  OK: 'OK',
  ERROR: 'ERROR',
});

/**
 * @swagger
 *
 * /api/v1/meta/health:
 *   get:
 *     tags:
 *       - meta
 *     description: API healthcheck
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: API healthcheck
 *         content:
 *           'application/json':
 *              schema:
 *                type: object
 *                required:
 *                  - data
 *                properties:
 *                  title:
 *                    type: string
 *                  version:
 *                    type: string
 *                  status:
 *                    type: string
 *                    enum:
 *                      - OK
 *                      - ERROR
 *                  timestamp:
 *                    type: number
 *                  message:
 *                    type: string
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           'application/json':
 *              schema:
 *                $ref: '#/definitions/Error500'
 */
router.get('/', (req, res) => {
  try {
    res.json({
      ...component,
      status: statuses.OK,
      timestamp: Date.now(),
    });
  } catch (e) {
    logger.error(`Error! Application is down!: ${JSON.stringify(e)}`);
    res.json({
      ...component,
      status: statuses.ERROR,
      timestamp: Date.now(),
      message: e.message || 'Something went wrong!',
    });
  }
});

module.exports = router;
