using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportNews
{
    public class Comment
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Text { get; set; }
        public DateTime Timestamp { get; set; }
        public ObjectId User{ get; set; }
        public ObjectId Article { get; set; }

    }
}
