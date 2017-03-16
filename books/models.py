from __future__ import unicode_literals

from django.db import models

# Create your models here.
# 书籍基本信息模型
class BookInfo(models.Model):
    # 书籍类型选项
    BOOK_TYPE_CHOICES = (
        (1, "仙剑"),
        (2, "玄幻"),
        (3, "悬疑"),
        (4, "奇幻"),
        (5, "军事"),
        (6, "历史"),
        (7, "竞技"),
        (8, "科幻"),
        (9, "军事"),
        (10, "校园"),
        (11, "社会"),
        (12, "其它"),
    )

    # 书籍更新状态选项
    BOOK_STATE_CHOICE = (
        (0, "未完结"),
        (1, "已完成"),
    )
    # 书名
    name = models.CharField("书名", max_length=20)
    # 书籍封面
    cover = models.ImageField("书籍封面")
    # 书籍简介
    describe = models.TextField("书籍概要简介")
    # 书籍类型
    type = models.SmallIntegerField("书籍类型", default = "仙剑", choices = BOOK_TYPE_CHOICES)
    # 书籍字数
    word_number = models.IntegerField("字数", default=0)
    # 更新状态
    state = models.SmallIntegerField("更新状态", default = "未完成", choices = BOOK_STATE_CHOICE)
    # 目前章节数量
    chapters_number = models.SmallIntegerField("更新章节数", default=0)
    # 最近一次的更新时间
    update_time = models.DateTimeField("更新时间", auto_now_add=True)
    # 点击量
    clicks_number = models.IntegerField("点击量", default=0)
    # 订阅量
    subscribers_number = models.IntegerField("订阅量", default=0)
    # 追书量
    chase_books_number = models.IntegerField("追书量", default=0)

    def add_clicks_number(self):
        self.clicks_number += 1

    def add_subscriber_number(self):
        self.subscribers_number += 1

    def add_chase_number(self):
        self.chase_books_number += 1

    def __unicode__(self):
        return u'%s %s %s %s %s %s %s %s %s' %(self.name, self.type, self.word_number, self.state, self.chapters_number, self.update_time, self.clicks_number, self.subscribers_number, self.chase_books_number)
    class Meta:
        db_table = "book_info"


# 书籍内容模型
class BooksContent(models.Model):
    # 对应的图书ID
    book_id =models.ForeignKey(BookInfo, verbose_name="书本ID")
    # 章节数
    chapters_id = models.SmallIntegerField("章节数")
    # 章节名称
    chapters_name = models.CharField("章节名称")
    # 该章节的内容
    chapters_content = models.TextField("章节内容")
    # 改章节更新时间
    update_time = models.DateTimeField("章节更新时间", auto_now_add=True)

    class Meta:
        db_table = "book_content"
