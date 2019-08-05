const mongoose = require('mongoose');

const Bstore = mongoose.model('Bstore');

const multer = require('multer');

const jimp = require('jimp');

const uuid = require('uuid');

const multerOptions = {
	storage: multer.memoryStorage(),
	// the above stores the image to the computer
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		// the above checks the file type to be sure if it's image
		if(isPhoto){
			next(null, true); //that means all is well
		} else{
			next({message:'Please do check the file you are uploading'}, false);
		}
	}
};

exports.home = (req, res) => {
	res.render('jade');
};

exports.form = (req, res) => {
	res.render('addStore');
};

exports.upload = multer(multerOptions).single('photo');
// the above will encapsulate the multerOptions inside of the multer variable and tie it to the form feed

exports.resize = async(req, res, next)=>{
	if(!req.file){
		next();
		return;
	}
  const extension = req.file.mimetype.split('/')[1];
  // the above will fetch the user's uploaded image name e.g. efe.jpg and split it into .jpg
  req.body.photo = `${uuid.v4()}.${extension}`;
  // the above retrieves just the file format, attaches a unique identifier & saves it to prevent an overwrite
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  // the above fetches the image buffer information uploaded by user
  await photo.resize(800, jimp.AUTO);
  // the above will resize the image to 800 pixel width with auto height
  await photo.write(`./public/uploads/${req.body.photo}`);
  // save the uploaded image to the uploads folder
  // once we have written the photo to our filesystem, keep going!
  next();
}

exports.add = async (req, res) => {
	const bStore = new Bstore(req.body);
	await bStore.save();
	console.log('New book was saved');
	res.redirect('/');
};

exports.getStore = async (req, res) => {
	const stores = await Bstore.find();
	console.log(stores);
	// res.json(store);

	res.render('store2', {stores:stores});
};

exports.editStore = async(req, res) =>{
	const store = await Bstore.findOne({_id: req.params.id});
	res.render('editStore', {store:store});
	// res.json(store);
};

exports.updateBstore = async(req, res) =>{
	const store = await Bstore.findOneAndUpdate({
		_id: req.params.id}, 
		req.body, {
			new:true,
		}).exec();
	res.redirect(`/store/${store._id}/edit`);
	console.log('Edit is done');
};