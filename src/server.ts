import express from 'express';
import bodyParser from 'body-parser';
import { isNil } from 'lodash'
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { validateImageURL } from './util/image-handler';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.get("/filteredimage", async (req, res) => {
    const { image_url } = req.query
    if (isNil(image_url)) {
      res.status(410).send("Image URL cannot be blank")
    }
    if (typeof image_url === "string") {
      const isImageURLValid = validateImageURL(image_url);
      console.log(isImageURLValid)
      console.log(image_url)
      if (isImageURLValid) {
        try {
          const imageResponse = await filterImageFromURL(image_url);
          if (imageResponse !== "no image found") {
            res.status(200).sendFile(imageResponse, async callback => {
              await deleteLocalFiles([imageResponse])
            })
          } else {
            res.status(200).send("Not found image")
          }
        } catch (error) {
          res.status(200).send("Not found image")
        }
      } else {
        res.status(411).send("Image URL is invalid")
      }
    }

  })
  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    console.log(req.query.query)
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();