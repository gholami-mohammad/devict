<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('word_id')->unsigned();
            $table->bigInteger('step_id')->unsigned()->nullable();
            $table->boolean('remembered');
            $table->timestamps();

            $table->foreign('word_id')
            ->on('words')
            ->references('id')
            ->onDelete('CASCADE')
            ->onUpdate('CASCADE');

            $table->foreign('step_id')
            ->on('steps')
            ->references('id')
            ->onDelete('CASCADE')
            ->onUpdate('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};
