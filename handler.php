<?
if(!empty($_POST['article_id'])) $article_id = (int)$_POST['article_id'];
if(isset($article_id)) {
   // делаем запрос в БД с выборкой нужной статьи
   // и отправляем данные ответом или false, если статьи с указанным id не найдено
   echo json_encode($article_data);
   exit;
}?>