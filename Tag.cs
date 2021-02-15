using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportNews
{
    public class Tag
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Text { get; set; }

    }
}
