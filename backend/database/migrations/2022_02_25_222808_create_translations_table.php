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
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("word_id")->unsigned()->index();
            $table->string("part_of_speech_name", 30)->nullable();
            $table->string('language_alpha2code', 2)->index();
            $table->bigInteger("created_by_id")->unsigned()->nullable();
            $table->string("translation", 512);
            $table->text("definition")->nullable();
            $table->text("example")->nullable();
            $table->timestampsTz();

            $table->foreign("word_id")
                ->on("words")
                ->references("id")
                ->onDelete("CASCADE")
                ->onUpdate("CASCADE");
            $table->foreign("part_of_speech_name")
                ->on("parts_of_speech")
                ->references("name")
                ->onDelete("SET NULL")
                ->onUpdate("CASCADE");
            $table->foreign("created_by_id")
                ->on("users")
                ->references("id")
                ->onDelete("SET NULL")
                ->onUpdate("CASCADE");

            $table->foreign('language_alpha2code')
                ->on('languages')
                ->references('alpha2code')
                ->onDelete('RESTRICT')
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
        Schema::dropIfExists('translations');
    }
};
