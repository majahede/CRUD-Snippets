/**
 * Encapsulates a controller.
 */
export class SnippetsController {
  /**
   * Renders a view and sends the rendered HTMl as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res.render('snippets/index')
  }

  /**
   * Renders a view, based on posted data, and sends
   * the rendered HTMl as an HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  indexPost (req, res, next) {
    const viewData = { // datat som ska skickas till vyn.
    }

    res.render('snippets', { viewData })
  }
}
