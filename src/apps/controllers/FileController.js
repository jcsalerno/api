const fsp = require("fs/promises");
const B2 = require("backblaze-b2");

const { APPLICATION_KEY_ID, APPLICATION_KEY, BUCKET_ID, BASE_URL } =
  process.env;

const b2 = new B2({
  applicationKeyId: APPLICATION_KEY_ID,
  applicationKey: APPLICATION_KEY,
});

const unlinkAsyn = fsp.unlink;

class FileController {
  async upload(req, res) {
    const { filename, path } = req.file;

    try {
      // Lendo o arquivo usando fs/promises
      const file = await fsp.readFile(`uploads/${filename}`);

      // Autorizando o cliente B2
      await b2.authorize();

      // Obtendo a URL de upload e o token de autorização
      const {
        data: { uploadUrl, authorizationToken },
      } = await b2.getUploadUrl({
        bucketId: BUCKET_ID,
      });

      // Upload do arquivo
      const { data } = await b2.uploadFile({
        uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName: filename,
        data: file,
      });

      await unlinkAsyn(path);

      const urlCompleta = BASE_URL + data.fileName;

      return res.send({ url: urlCompleta });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to upload image" });
    }
  }
}

module.exports = new FileController();
