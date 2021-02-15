using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportNews
{
    public class Article
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public ContentCreator PostedBy { get; set; }
        public DateTime Created { get; set; }
        public Category Category { get; set; }
        public IList<Tag> Tags { get; set; }
        public string Text { get; set; }
        public string Title { get; set; }


    }
}
