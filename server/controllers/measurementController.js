import Measurement from '../models/Measurement.js';
import { ApiError } from '../middlewares/errorHandler.js';

export const getMyMeasurements = async (req, res, next) => {
  try {
    const measurements = await Measurement.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: measurements.length,
      data: measurements
    });
  } catch (error) {
    next(error);
  }
};

export const createMeasurement = async (req, res, next) => {
  try {
    const {
      profileTitle,
      clothingType,
      unit,
      shoulder,
      chest,
      waist,
      hip,
      sleeveLength,
      armhole,
      sleeveRound,
      blouseLength,
      dressLength,
      frontNeckDepth,
      backNeckDepth,
      neckType,
      frontCross,
      bottomRound,
      customNotes,
      isDefault
    } = req.body;

    if (!profileTitle) {
      return next(new ApiError('Please provide a profile name (e.g., Wedding Blouse)', 400));
    }

    if (isDefault) {
      await Measurement.updateMany({ user: req.user._id }, { isDefault: false });
    }

    const measurement = await Measurement.create({
      user: req.user._id,
      profileTitle,
      clothingType: clothingType || 'Blouse',
      unit: unit || 'inches',
      shoulder: Number(shoulder) || 0,
      chest: Number(chest) || 0,
      waist: Number(waist) || 0,
      hip: Number(hip) || 0,
      sleeveLength: Number(sleeveLength) || 0,
      armhole: Number(armhole) || 0,
      sleeveRound: Number(sleeveRound) || 0,
      blouseLength: Number(blouseLength) || 0,
      dressLength: Number(dressLength) || 0,
      frontNeckDepth: Number(frontNeckDepth) || 0,
      backNeckDepth: Number(backNeckDepth) || 0,
      neckType: neckType || 'Round / U-Shape',
      frontCross: Number(frontCross) || 0,
      bottomRound: Number(bottomRound) || 0,
      customNotes: customNotes || '',
      isDefault: Boolean(isDefault)
    });

    res.status(201).json({
      success: true,
      message: 'Measurement profile saved successfully',
      data: measurement
    });
  } catch (error) {
    next(error);
  }
};

export const updateMeasurement = async (req, res, next) => {
  try {
    const measurement = await Measurement.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!measurement) {
      return next(new ApiError('Measurement profile not found', 404));
    }

    if (req.body.isDefault) {
      await Measurement.updateMany({ user: req.user._id }, { isDefault: false });
    }

    Object.assign(measurement, req.body);
    await measurement.save();

    res.status(200).json({
      success: true,
      message: 'Measurement profile updated',
      data: measurement
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMeasurement = async (req, res, next) => {
  try {
    const measurement = await Measurement.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!measurement) {
      return next(new ApiError('Measurement profile not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Measurement profile deleted'
    });
  } catch (error) {
    next(error);
  }
};

export const getMeasurementsForUser = async (req, res, next) => {
  try {
    const measurements = await Measurement.find({ user: req.params.userId });
    res.status(200).json({
      success: true,
      data: measurements
    });
  } catch (error) {
    next(error);
  }
};
