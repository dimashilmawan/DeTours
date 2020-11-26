const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'A tour must have a name'],
    maxlength: [40, `A tour's name must have less or equal 40 characters`],
    minlength: [10, `A tour's name must have more or equal 10 characters`]
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour must have a group size']
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'a tour must have a image'],
    trim: true
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDate: {
    type: Date,
    required: [true, 'a tour must have a start date']
  },
  startLoc: {
    type: String,
    required: [true, 'a tour must have a start location']
  },
  location: {
    type: String,
    required: [true, 'a tour must have a location']
  }
});

// DOCUMENT MIDDLEWARE: Run before .save() or create()
// save hook / save middleware
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  this.imageCover = this.imageCover.replace(/\s+/g, '');
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
