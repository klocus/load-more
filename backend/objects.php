<?php
    /* Copyright by Paweł Klockiewicz; MIT licensed */
    sleep(1); // Simulate a slow server

    function getData($page) {
        $perPage = 3;
        $offset = (($page - 1) * $perPage) + 1;

        $objects = [];
        $firstObject = 1;

        for ($i = 0; $i < $perPage; $i++) {
            $id = $firstObject - 1 + $offset + $i;
            $objects[] = [
                'id'        => $id,
                'image'     => 'http://via.placeholder.com/500x500',
                'name'      => 'Filename' . $id . '.png',
                'tags'      => '<a href="#">Link</a> <a href="#">Link</a> <a href="#">Link</a>',
                'uploaded'  => date('d.m.Y H:i'),
                'edited'    => date('d.m.Y H:i'),
                'author'    => 'John Kowalsky',
            ];
        }
        return $objects;
    }

    $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;

    /* Simulate end of objects
    if ($page > 5) {
        die(header("HTTP/1.0 404 Not Found"));
    }
    */

    $objects = getData($page);
?>

<?php foreach($objects as $object): ?>
<article class="file-box box-shadow">
    <div class="row">
        <div class="col c1 image">
          <img src="<?php echo $object['image']; ?>">
        </div>
        <div class="col c3 info">
            <h4 class="name"><a href="#"><?php echo $object['name']; ?></a></h4>
            <div class="nav tags">
                <?php echo $object['tags']; ?>
            </div>
        </div>
        <div class="col c6 meta">
            <div class="row">
                <div class="col c4">
                    <h4 class="title">Uploaded</h4>
                    <p class="value"><?php echo $object['uploaded']; ?></p>
                </div>
                <div class="col c4">
                    <h4 class="title">Edited</h4>
                    <p class="value"><?php echo $object['edited']; ?></p>
                </div>
                <div class="col c4">
                    <h4 class="title">Author</h4>
                    <p class="value"><?php echo $object['author']; ?></p>
                </div>
            </div>
        </div>
        <div class="col c2 actions">
            <div class="nav">
                <a href="#" title="Remove">
                    <span class"ico">⊝</span>
                </a>
                <a href="#" title="Add to favorites">
                    <span class="ico">✰</span>
                </a>
                <a href="#" title="Edit">
                    <span class="ico">✎</span>
                </a>
        </div>
    </div>
</article>
<?php endforeach; ?>
