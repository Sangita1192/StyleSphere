const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
    keyword:{
        type:String,
        required:true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:false
    },
    count:{
        type:Number,
        default:0
    },
    created_at: Date,
    updated_at:{
        type: Date,
        default: Date.now()
    }   
});
SearchHistorySchema.pre('save', function(){
    this.created_at = Date.now();
});

// Add index for better search performance on `keyword` and `user`
SearchHistorySchema.index({ keyword: 1, user: 1 });  // Index for user-based search
SearchHistorySchema.index({ keyword: 1, count: -1 }); // For global trends: sorted by count in descending order


// TTL Index: Automatically delete search history older than 7 days
SearchHistorySchema.index({ created_at: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });  // TTL of 7 days

const SearchHistory = mongoose.model('searchHistory', SearchHistorySchema);

module.exports = SearchHistory;