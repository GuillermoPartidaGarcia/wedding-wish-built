const reviewService = require('../service/review.service');

function validateReviewCreate(userId, productId, value){
    if(!userId)
        return 'userId cannot be null';
    if(!productId)
        return 'productId cannot be null';
    if(!value && typeof value === 'number')
        return 'value must be a number';
    return null;
}
async function reviewCreateOrUpdate(req, res){
    const {
      user,
      body: {
        productId,
        value
      },
    } = req;
    
    if (!user) {
      return res.status(401).send('Unathorized');
    } 

    const { id: userId } = user;

    const userErr = validateReviewCreate(userId, productId, value);
    if(userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await reviewService.reviewCreateOrUpdate(productId, userId, value);
    if(err) 
        return res.status(code).send(err);
    res.status(200).json(data);
}

function validateMyReview(userId, productId){
  if(!userId)
      return 'userId required'; 
  if(!productId)
      return 'productId required';
  return null;
}
async function myReview(req, res){

  const { 
    user, 
    params: {
      id:productId
    } 
  } = req;

  if (!user) {
    return res.status(401).send('Unathorized');
  } 

  const { id:userId } = user;

  const userErr = validateMyReview( userId, productId);
  if(userErr)
      return res.status(400).send(userErr);

  const { code, err, data } = await reviewService.myReview( userId, productId);
  if(err) 
      return res.status(code).send(err);
  res.status(200).json(data);
}

function validateReviewFromProduct(productId){
    if(!productId)
        return 'productId cannot be null';
    return null;
}
async function reviewFromProduct(req, res){
    const { id:productId } = req.params;

    const userErr = validateReviewFromProduct(productId);
    if(userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await reviewService.reviewFromProduct(productId);
    if(err) 
        return res.status(code).send(err);
    res.status(200).json(data);
}

function validateReviewDelete(id){
    if(!id)
        return 'Id cannot be null';
    return null;
}
async function reviewDelete(req, res){
    const { id } = req.params;

    const userErr = validateReviewDelete(id);
    if(userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await reviewService.reviewDelete(id);
    if(err) 
        return res.status(code).send(err);
    res.status(200).json(data);
}

module.exports = {
    reviewCreateOrUpdate,
    myReview,
    reviewFromProduct,
    reviewDelete
};
