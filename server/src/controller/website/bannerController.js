const Banner = require("../../models/banner");

const readBannersWeb = async (req, res) => {
    try {
        const today = new Date();
        const normalizedToday = new Date(today.toISOString().split('T')[0]); // Strip time
        console.log('today==>', today);
        // Check for active seasonal banners
        const seasonalBanners = await Banner.find({
            start_date: { $lte: normalizedToday },
            end_date: { $gte: normalizedToday },
            isFallback: false, // Exclude fallback banners
        });
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;

        // If seasonal banners exist, randomly pick one
        if (seasonalBanners.length > 0) {
            const randomIndex = Math.floor(Math.random() * seasonalBanners.length);
            const response = seasonalBanners[randomIndex]
            return res.status(200).json({ message: "success", filePath, data: response });
        }


        // Otherwise, return randomly selected fallback banners
        const randomFallbackBanner = await Banner.aggregate([
            { $match: { isFallback: true } },  // Match only fallback banners
            { $sample: { size: 1 } }           // Randomly select one
        ]);

        res.status(200).json({ message: "success", filePath, data: randomFallbackBanner });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

module.exports = {
    readBannersWeb
}