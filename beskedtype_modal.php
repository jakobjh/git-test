<div class="modal fade" id="nybeskedtype" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Luk</span></button>
            <h4 class="modal-title" id="nybeskedtypelabel">Opret ny beskedtype</h4>
          </div>
          <div class="modal-body">

          <form id="opret_ny_beskedtype" action="ajax/opret_ny_beskedtype.php" class="form-horizontal well" data-async data-target="#nybeskedtype" method="post" role="form" >
            <fieldset>

                <label for="ny_navn">Navn:</label>
                <input type="text" name="ny_navn" id="ny_navn" maxlength="30" class="form-control">

                <div class="filler"></div>

                <label for="ny_emne">Emne:</label>
                <input type="text" name="ny_emne" id="ny_emne" class="form-control"  >

                <div class="filler"></div>

                <label for="ny_tekst">Tekst:</label>
                <textarea name="ny_tekst" id="ny_tekst" class="form-control" rows="6"></textarea>

                <div class="filler"></div>

                <button type="submit" class="btn btn-primary">Opret</button>

            </fieldset>
          </form>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Luk</button>
          </div>
        </div>
      </div>
    </div>