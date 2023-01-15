export function createButtons() {
  return `<div class="buttons-wrapper">
      <button
        type="button"
        class="button-modal add-to-watched-btn"
        data-action="add-to-watched"
      >
        ADD TO WATCHED</button
      ><button
        type="button"
        class="button-modal add-to-queue-btn"
        data-action="add-to-queue"
      >
        ADD TO QUEUE
      </button>
    </div>`;
}
