<template>
  <div class="Modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h1>Confirm</h1>

          <slot name="body">
            {{ message }}
          </slot>

          <div class="footer">
            <button class="btn" @click="$emit('confirm', id)">Yes</button>
            <button class="btn" @click="$emit('close')">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["showModal", "id", "message"],
};
</script>
<style lang="scss" scoped>
.Modal {
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .modal-container {
    width: 400px;
    max-width: 90%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    text-align: center;
  }

  .modal-body {
    margin: 20px 0;
  }

  .btn {
    margin-right: 20px;
    background-color: #237fac;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .footer {
    margin-top: 20px;
  }
}
</style>
