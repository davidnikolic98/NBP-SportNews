using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace SportNews.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContentCreatorsController : ControllerBase
    {


        private IMongoDatabase db = Session.MongoDatabase;

        [HttpPost]
        [Route("addContentCreator")]
        public async Task<IActionResult> AddContentCreator([FromBody] ContentCreator contentCreator)
        {
            var collection = db.GetCollection<ContentCreator>("ContentCreator");
            var collection2 = db.GetCollection<User>("User");
            if (collection.Find(x=>x.Username == contentCreator.Username).FirstOrDefault() == null&&
                collection2.Find(x => x.Username == contentCreator.Username).FirstOrDefault() == null)
            {
                collection.InsertOne(contentCreator);
                return Ok();
            }
            else return BadRequest("Username already exists!");
        }
        [HttpGet]
        [Route("getContentCreator/{username}")]
        public async Task<IActionResult> getContentCreator([FromRoute] string username)
        {
            var collection = db.GetCollection<ContentCreator>("ContentCreator");
            var contentCreator=collection.Find(x => x.Username == username).FirstOrDefault();
            return new JsonResult(contentCreator);
        }
        [HttpDelete]
        [Route("DeleteContentCreator")]
        public async Task<IActionResult> DeleteContentCreator([FromBody] ContentCreator contentCreator)
        {
            var collectionArticles = db.GetCollection<Article>("Article");
            var collectionComments = db.GetCollection<Comment>("Comment");
            var articleList = collectionArticles.Find(x =>x.PostedBy.Id==contentCreator.Id).ToList<Article>();
            for(int k=0;k<articleList.Count;k++)
            {
                await collectionComments.DeleteManyAsync(x => x.Article == articleList[k].Id);
                var collectionUsers = db.GetCollection<User>("User");
                var userList = collectionUsers.Find(x => true).ToList<User>();
                for (int i = 0; i < userList.Count; i++)
                {
                    IList<Article> newReadList = new List<Article>();
                    IList<Article> newRecommendedList = new List<Article>();
                    IList<Article> readList = userList[i].Articles;
                    IList<Article> recommendedList = userList[i].Recommended;
                    for (int j = 0; j < readList.Count; j++)
                    {
                        if (readList[j].Id != articleList[k].Id)
                            newReadList.Add(readList[j]);
                    }
                    var filterRead = Builders<User>.Filter.Eq(x => x.Id, userList[i].Id);
                    var updateRead = Builders<User>.Update.Set(x => x.Articles, newReadList);
                    collectionUsers.UpdateOne(filterRead, updateRead);
                    for (int j = 0; j < recommendedList.Count; j++)
                    {
                        if (recommendedList[j].Id != articleList[k].Id)
                            newReadList.Add(recommendedList[j]);
                    }
                    var filterRecommended = Builders<User>.Filter.Eq(x => x.Id, userList[i].Id);
                    var updateRecommended = Builders<User>.Update.Set(x => x.Recommended, newReadList);
                    collectionUsers.UpdateOne(filterRecommended, updateRecommended);
                }
                var collection = db.GetCollection<Article>("Article");
                collection.DeleteOne(x => x.Id == articleList[k].Id);
            }
            return Ok();
        }
        [HttpPost]
        [Route("writeArticle")]
        public async Task<IActionResult> WriteArticle([FromBody] Article article)
        {
            var collectionArticles = db.GetCollection<Article>("Article");
            if (collectionArticles.Find(x => x.Title == article.Title).FirstOrDefault() != null)
            {
                return BadRequest("Article already exists!");
            }
            collectionArticles.InsertOne(article);
            IList<ObjectId> retList = new List<ObjectId>();
            foreach (ObjectId id in article.PostedBy.Articles)
            {
                retList.Add(id);
            }
            retList.Add(article.Id);
            var collectionContentCreators = db.GetCollection<ContentCreator>("ContentCreator");
            var filter = Builders<ContentCreator>.Filter.Eq(x => x.Id,article.PostedBy.Id);
            var update = Builders<ContentCreator>.Update.Set(x => x.Articles, retList);
            collectionContentCreators.UpdateOne(filter, update);
            return Ok();
        }
        [HttpGet]
        [Route("getAllArticles")]
        public async Task<IActionResult> GetAllArticles()
        {
            var collection = db.GetCollection<Article>("Article");
            var articles = collection.Find(x => true).ToList();
            return new JsonResult(articles);
        }
        [HttpGet]
        [Route("getArticle/{name}")]
        public async Task<IActionResult> getArticle([FromRoute] string name)
        {
            var collection = db.GetCollection<Article>("Article");
            var contentCreator = collection.Find(x => x.Title == name).FirstOrDefault();
            return new JsonResult(contentCreator);
        }
        [HttpPut]
        [Route("UpdateArticle/{title}/{text}")]
        public async Task<IActionResult> UpdateArticle([FromRoute] string title,[FromRoute] string text)
        {
            var collection = db.GetCollection<Article>("Article");
        
            var filter = Builders<Article>.Filter.Eq(x => x.Title, title);
            var update = Builders<Article>.Update.Set(x => x.Text, text);
            //collection.ReplaceOne(x => x.Id == article.Id , article);
            collection.UpdateOne(filter,update);
            return Ok();
        }
        [HttpDelete]
        [Route("DeleteArticle")]
        public async Task<IActionResult> DeleteArticle([FromBody] Article article)
        {
            var collectionComments = db.GetCollection<Comment>("Comment");
            await collectionComments.DeleteManyAsync(x => x.Article == article.Id);
            var collectionUsers = db.GetCollection<User>("User");
            var userList = collectionUsers.Find(x => true).ToList<User>();
            for (int i=0;i<userList.Count;i++)
            {
                IList<Article> newReadList = new List<Article>();
                IList<Article> newRecommendedList = new List<Article>();
                IList<Article> readList = userList[i].Articles;
                IList<Article> recommendedList = userList[i].Recommended;
                for (int j=0;j<readList.Count;j++)
                {
                    if (readList[j].Id != article.Id)
                        newReadList.Add(readList[j]);
                }
                var filterRead = Builders<User>.Filter.Eq(x => x.Id, userList[i].Id);
                var updateRead = Builders<User>.Update.Set(x => x.Articles, newReadList);
                collectionUsers.UpdateOne(filterRead, updateRead);
                for (int j = 0; j < recommendedList.Count; j++)
                {
                    if (recommendedList[j].Id != article.Id)
                        newReadList.Add(recommendedList[j]);
                }
                var filterRecommended = Builders<User>.Filter.Eq(x => x.Id, userList[i].Id);
                var updateRecommended = Builders<User>.Update.Set(x => x.Recommended, newReadList);
                collectionUsers.UpdateOne(filterRecommended, updateRecommended);
            }
            var collection = db.GetCollection<Article>("Article");
            collection.DeleteOne(x => x.Id == article.Id);
            
            return Ok();
        }


        [HttpPost]
        [Route("AddCategory")]
        public async Task<IActionResult> AddCategory([FromBody] Category category)
        {
            var collection = db.GetCollection<Category>("Category");
            if (collection.Find(x => x.Text == category.Text).FirstOrDefault() == null)
            {
                collection.InsertOne(category);
                return Ok();
            }
            else return BadRequest("Category already exists!");
        }

        [HttpPut]
        [Route("UpdateCategory")]
        public async Task<IActionResult> UpdateCategory([FromBody] Category category)
        {
            var collection = db.GetCollection<Category>("Category");
            var filter = Builders<Category>.Filter.Eq(x => x.Id, category.Id);
            var update = Builders<Category>.Update.Set(x => x.Text, category.Text);
            collection.UpdateOne(filter, update);

            var collectionArticles = db.GetCollection<Article>("Article");
            var articleList = collectionArticles.Find(x => x.Category.Text == category.Text).ToList<Article>();

            foreach (Article article in articleList)
            {
                article.Category = category;
                await UpdateArticle(article.Title,article.Text);
            }

            return Ok();
        }
        [HttpGet]
        [Route("getArticlesByCategory/{category}")]
        public async Task<IActionResult> getArticlesByCategory([FromRoute] string category)
        {
            var collection = db.GetCollection<Article>("Article");
            var articles = collection.Find(x => x.Category.Text == category).ToList();
            return new JsonResult(articles);
        }
        [HttpGet]
        [Route("getArticlesByUsername/{username}")]
        public async Task<IActionResult> getArticlesByUsername([FromRoute] string username)
        {
            var collection = db.GetCollection<Article>("Article");
            var articles = collection.Find(x => x.PostedBy.Username == username).ToList();
            return new JsonResult(articles);
        }
        [HttpDelete]
        [Route("DeleteCategory")]
        public async Task<IActionResult> DeleteCategory([FromBody] Category category)
        {
            var collection = db.GetCollection<Category>("Category");
            if (collection.Find(x => x.Text == category.Text).FirstOrDefault() != null)
            {
                collection.DeleteOne(x => x.Text == category.Text);

                var collectionArticles = db.GetCollection<Article>("Article");
                var articleList = collectionArticles.Find(x => x.Category.Text == category.Text).ToList<Article>();

                foreach (Article article in articleList)
                {
                    await DeleteArticle(article);
                }

                return Ok();
            }
            else return BadRequest("Category does not exist!");
        }
        [HttpGet]
        [Route("getAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var collection = db.GetCollection<Category>("Category");
            var categories = collection.Find(x => true).ToList();
            return new JsonResult(categories);
        }
        [HttpGet]
        [Route("getCategory/{name}")]
        public async Task<IActionResult> GetCategory([FromRoute] string name)
        {
            var collection = db.GetCollection<Category>("Category");
            var category = collection.Find(x => x.Text==name).FirstOrDefault();
            return new JsonResult(category);
        }
        [HttpPost]
        [Route("AddTag")]
        public async Task<IActionResult> AddTag([FromBody] Tag tag)
        {
            var collection = db.GetCollection<Tag>("Tag");
            if (collection.Find(x => x.Text == tag.Text).FirstOrDefault() == null)
            {
                collection.InsertOne(tag);
                return Ok();
            }
            else return BadRequest("Tag already exists!");
        }
        [HttpGet]
        [Route("getTag/{name}")]
        public async Task<IActionResult> GetTag([FromRoute] string name)
        {
            var collection = db.GetCollection<Tag>("Tag");
            var tag = collection.Find(x => x.Text == name).FirstOrDefault();
            return new JsonResult(tag);
        }
         
        [HttpGet]
        [Route("getAllTags")]
        public async Task<IActionResult> GetAllTags()
        {
            var collection = db.GetCollection<Tag>("Tag");
            var tags = collection.Find(x => true).ToList();
            return new JsonResult(tags);
        }

        [HttpPut]
        [Route("UpdateTag")]
        public async Task<IActionResult> UpdateTag([FromBody] Tag tag)
        {
            var collection = db.GetCollection<Tag>("Tag");
            var filter = Builders<Tag>.Filter.Eq(x => x.Id, tag.Id);
            var update = Builders<Tag>.Update.Set(x => x.Text, tag.Text);
            collection.UpdateOne(filter, update);

            var collectionArticles = db.GetCollection<Article>("Article");
            var articleList = collectionArticles.Find(x => x.Tags.Contains(tag)).ToList<Article>();

            foreach (Article article in articleList)
            {
                Tag t = article.Tags.Where(x => x.Id == tag.Id).FirstOrDefault();
                article.Tags.Remove(t);

                t = tag;
                article.Tags.Add(t);

                await UpdateArticle(article.Title,article.Text);
            }

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteTag")]
        public async Task<IActionResult> DeleteTag([FromBody] Tag tag)
        {
            var collection = db.GetCollection<Tag>("Tag");
            if (collection.Find(x => x.Text == tag.Text).FirstOrDefault() != null)
            {
                collection.DeleteOne(x => x.Text == tag.Text);

                var collectionArticles = db.GetCollection<Article>("Article");
                var articleList = collectionArticles.Find(x => x.Tags.Contains(tag)).ToList<Article>();

                foreach (Article article in articleList)
                {
                    Tag t = article.Tags.Where(x => x.Text == tag.Text).FirstOrDefault();
                    article.Tags.Remove(t);

                    await UpdateArticle(article.Title,article.Text);
                }

                return new JsonResult(articleList);
            }
            else return BadRequest("Tag does not exist!");
        }
        [HttpGet]
        [Route("getUser/{username}")]
        public async Task<IActionResult> getUser([FromRoute] string username)
        {
            var collection = db.GetCollection<User>("User");
            var contentCreator = collection.Find(x => x.Username == username).FirstOrDefault();
            return new JsonResult(contentCreator);
        }
        [HttpPost]
        [Route("addUser")]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            var collection = db.GetCollection<ContentCreator>("ContentCreator");
            var collection2 = db.GetCollection<User>("User");
            if (collection.Find(x => x.Username == user.Username).FirstOrDefault() == null &&
                collection2.Find(x => x.Username == user.Username).FirstOrDefault() == null)
            {
                collection2.InsertOne(user);
                return Ok();
            }
            else return BadRequest("Username already exists!");
        }
        [HttpDelete]
        [Route("deleteUser")]
        public async Task<IActionResult> DeleteUser([FromBody] User user)
        {
            var collectionUsers = db.GetCollection<User>("User");
            var collectionComments = db.GetCollection<Comment>("Comment");
            collectionComments.DeleteMany(x => x.User == user.Id);
            collectionUsers.DeleteOne(x => x.Id == user.Id);
             return Ok();
        }
        [HttpPost]
        [Route("readArticle/{title}")]
        public async Task<IActionResult> readArticle([FromBody] User user,[FromRoute] string title)
        {
            var collectionUsers = db.GetCollection<User>("User");
            var collectionArticles = db.GetCollection<Article>("Article");
            var collectionContentCreators = db.GetCollection<ContentCreator>("ContentCreator");
            var collectionTags = db.GetCollection<Tag>("Tag");
            var article = collectionArticles.Find(x => x.Title == title).FirstOrDefault();
            IList<Article> retList = new List<Article>();

            if(user.Articles == null)
                user.Articles = new List<Article>();
            if(user.Recommended == null)
                user.Recommended = new List<Article>();

            if (user.Articles.Count < 10)
                user.Articles.Add(article);
            else
            {
                var readList = user.Articles.OrderByDescending(x => x.Created).ToList();
                user.Articles = new List<Article>();
                for(int i=1;i<readList.Count;i++)
                {
                    user.Articles.Add(readList[i]);
                }
                user.Articles.Add(article);
                
            }
            var filter = Builders<User>.Filter.Eq(x => x.Id, user.Id);
            var update = Builders<User>.Update.Set(x => x.Articles, user.Articles);
            collectionUsers.UpdateOne(filter, update);
            var categoryFrequencyTable = new Dictionary<string, int>();
            for (int i = 0; i < user.Articles.Count; i++)
            {
                if (!categoryFrequencyTable.ContainsKey(user.Articles[i].Category.Text))
                {
                    categoryFrequencyTable.Add(user.Articles[i].Category.Text, 0);
                }
                categoryFrequencyTable[user.Articles[i].Category.Text]++;
            }
            var tagsFrequencyTable = new Dictionary<string, int>();
            for (int i = 0; i < user.Articles.Count; i++)
            {
                foreach (Tag tag in user.Articles[i].Tags)
                {
                    if (!tagsFrequencyTable.ContainsKey(tag.Text))
                    {
                        tagsFrequencyTable.Add(tag.Text, 0);
                    }
                    tagsFrequencyTable[tag.Text]++;
                }
            }
            var contentCreatorFrequencyTable = new Dictionary<string, int>();
            for (int i = 0; i < user.Articles.Count; i++)
            {    
                if (!contentCreatorFrequencyTable.ContainsKey(user.Articles[i].PostedBy.Username))
                {
                    contentCreatorFrequencyTable.Add(user.Articles[i].PostedBy.Username, 0);
                }
                contentCreatorFrequencyTable[user.Articles[i].PostedBy.Username]++;              
            }
            IList<KeyValuePair<string, int>> categoryFrequencyList = categoryFrequencyTable.OrderByDescending(x => x.Value).ToList();
            IList<KeyValuePair<string, int>> tagsFrequencyList = tagsFrequencyTable.OrderByDescending(x => x.Value).ToList();
            IList<KeyValuePair<string, int>> contentCreatorFrequencyList = contentCreatorFrequencyTable.OrderByDescending(x => x.Value).ToList();
            IList<Article> newRecommended = new List<Article>();
            foreach (var v in tagsFrequencyList)
            {
                Tag tag = collectionTags.Find(x => x.Text == v.Key).FirstOrDefault();
                Article newArticle = collectionArticles.Find(x => x.Category.Text == categoryFrequencyList[0].Key && x.Tags.Contains(tag)).FirstOrDefault();
 
                newRecommended.Add(newArticle);
                if (newRecommended.Count == 3)
                    break;
            }
            newRecommended.Add(collectionArticles.Find(x => x.PostedBy.Username == contentCreatorFrequencyList[0].Key).FirstOrDefault());
            user.Recommended = newRecommended;
            filter = Builders<User>.Filter.Eq(x => x.Id, user.Id);
            update = Builders<User>.Update.Set(x => x.Recommended, user.Recommended);
            collectionUsers.UpdateOne(filter, update);
            //prikazi poslednji Article u listi user.Articles kao onaj koji user zeli da procita
            return new JsonResult(user);

        }
        [HttpPost]
        [Route("addComment")]
        public async Task<IActionResult> AddComment([FromBody] Comment comment)
        {
            var collection = db.GetCollection<Comment>("Comment");
            collection.InsertOne(comment);
            return Ok();
        }
        [HttpPost]
        [Route("getAllArticleComments")]
        public async Task<IActionResult> GetAllArticleComments([FromBody] Article article)
        {
            var collection = db.GetCollection<Comment>("Comment");
            var commentsList = collection.Find(x => x.Article == article.Id).ToList();
            return new JsonResult(commentsList);
        }
        [HttpGet]
        [Route("getAllUserComments")]
        public async Task<IActionResult> GetAllUserComments([FromBody] User user)
        {
            var collection = db.GetCollection<Comment>("Comment");
            var commentsList = collection.Find(x => x.User == user.Id).ToList();
            return new JsonResult(commentsList);
        }
        [HttpDelete]
        [Route("deleteComment")]
        public async Task<IActionResult> DeleteComment([FromBody] Comment comment)
        {
            var collection = db.GetCollection<Comment>("Comment");
            collection.DeleteOne(x => x.Id == comment.Id);
            return Ok();
        }
        [HttpPut]
        [Route("UpdateComment")]
        public async Task<IActionResult> UpdateComment([FromBody] Comment comment)
        {
            var collection = db.GetCollection<Comment>("Comment");
            var filter = Builders<Comment>.Filter.Eq(x => x.Id, comment.Id);
            var update = Builders<Comment>.Update.Set(x => x.Text, comment.Text);
            collection.UpdateOne(filter, update);
            return Ok();
        }
    }
}
