const SearchHistory = require("../../models/searchHistory");


const addSearchHistory = async (req, res) => {
    try {
        const { user, keyword } = req.body;

        // If the user is provided, handle the user-specific search history
        if (user) {
            // Find if this user has already searched for the keyword
            const userSearch = await SearchHistory.findOne({ user: user, keyword });

            if (userSearch) {
                // If the user has searched for this keyword before, increment the count
                await SearchHistory.findOneAndUpdate(
                    { user: user, keyword },
                    { $inc: { count: 1 } }
                );
            } else {
                // If the user has not searched for this keyword, create a new entry
                await SearchHistory.create({
                    user: user,
                    keyword: keyword,
                    count: 1,
                    created_at: new Date()
                });
            }
        }

        // Handle global trending searches (no user field, just the keyword count)
        const globalSearch = await SearchHistory.findOne({ keyword });

        if (globalSearch) {
            // If global search history exists for this keyword, increment the count
            await SearchHistory.findOneAndUpdate(
                { keyword },
                { $inc: { count: 1 } }
            );
        } else {
            // If no global search history exists for this keyword, create a new entry
            await SearchHistory.create({
                keyword: keyword,
                count: 1,
                created_at: new Date(),
            });
        }
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

const viewUserSearchKeyword = async(req,res)=>{
    try{
        const {user} = req.params;
        if(user){
            const userSearchHistory = await SearchHistory.find({user})
                                            .sort({updated_at: -1}) //sort by most recent first
                                            .limit(7);  //top 7 most recent
            res.status(200).json({message:'success', data: userSearchHistory})
        }
        else{
            const globalSearchHistory = await SearchHistory.find()
                                                .sort({updated_at:-1})
                                                .limit(7);
                                                
            res.status(200).json({message:'success', data: globalSearchHistory})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

const trendingSearch = async(req,res)=>{
    try{
        const trendingSearch = await SearchHistory.find()
                                                    .sort({count:-1})  //sort by most searched keywords
                                                    .limit(7); //top 7 most trending
        res.status(200).json({message:'success', data:trendingSearch}); 
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

module.exports = {
    addSearchHistory,
    viewUserSearchKeyword,
    trendingSearch
}