import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User, user } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation
  // check if user already exists
  // check for images and check for AVATAR
  // upload them to cloudinary, avatar
  // create user object -

  const { fullName, email, username, password } = req.body;
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All Fields are Required");
  }

  const existedUser = await user.findOne({
    $or: [{ username }, { email }],
  });
});

if (existedUser) {
  throw new apiError(409, "User with email or username already Exists");
}

const avatarLocakPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0].path;

if (!avatarLocakPath) {
  throw new apiError(400, "Avatar file is required");
}

const avatar = await uploadOnCloudinary(avatarLocakPath);
const CoverImage = await uploadOnCloudinary(coverImageLocalPath);

if (!avatar) {
  throw new apiError(400, "Avatar file is required");
}
const user = await user.create({
  fullName,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  username: username.toLowerCase(),
});
const createdUser = await User.findById(user._id).select(
  "-password -refreshToken"
);

if(!createdUser){
    throw new apiError(500 , "Something went Wrong while Registering ")
}
return res.status(201).json(
    new apiResponse(200, createdUser,"User register Succesfuly")
)

export { registerUser };
