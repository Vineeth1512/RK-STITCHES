import Setting from '../models/Setting.js';

export const getSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({
        businessName: 'RK STITCHES',
        tagline: 'Exclusive Tailoring & Designer Studio for Women & Kids',
        phone: '+91 98765 43210',
        whatsapp: '+919876543210',
        email: 'contact@rkstitches.com'
      });
    }
    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.status(200).json({
      success: true,
      message: 'Business settings updated',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};
